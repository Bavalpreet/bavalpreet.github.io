"""Simple Flask API providing system stats for the site."""

from flask import Flask, jsonify
import os
import platform
import psutil
import shutil
import subprocess
from typing import List



app = Flask(__name__)


def gpu_temperature() -> str:
    """Return a best-effort GPU temperature for the current machine."""

    # Prefer NVIDIA GPUs when nvidia-smi is available
    if shutil.which("nvidia-smi"):
        try:
            output = subprocess.check_output(
                [
                    "nvidia-smi",
                    "--query-gpu=temperature.gpu",
                    "--format=csv,noheader",
                ],
                text=True,
            )
            return f"{output.strip()}°C"
        except Exception:
            pass

    # Try psutil's sensor API (may provide CPU temp on some systems)
    try:
        temps = psutil.sensors_temperatures()
        for entries in temps.values():
            if entries:
                return f"{entries[0].current:.0f}°C"
    except Exception:
        pass

    # Attempt macOS powermetrics for Apple Silicon machines
    if platform.system() == "Darwin" and shutil.which("powermetrics"):
        try:
            output = subprocess.check_output(
                ["powermetrics", "--samplers", "smc", "-n", "1"],
                text=True,
                stderr=subprocess.DEVNULL,
            )
            for line in output.splitlines():
                if "GPU die temperature" in line:
                    return line.split(":")[1].strip()
        except Exception:
            pass

    return "N/A"

@app.get("/system/stats")
def system_stats():
    """Expose GPU status, available RAM and training progress."""

    memory = psutil.virtual_memory()
def gpu_percent() -> float:
    """Return GPU utilization percentage if available."""

    if shutil.which("nvidia-smi"):
        try:
            output = subprocess.check_output(
                [
                    "nvidia-smi",
                    "--query-gpu=utilization.gpu",
                    "--format=csv,noheader,nounits",
                ],
                text=True,
            )
            return float(output.strip())
        except Exception:
            pass
    return 0.0


GPU_HISTORY: List[float] = []
CPU_HISTORY: List[float] = []
RAM_HISTORY: List[float] = []
MAX_HISTORY = 20


@app.get("/system/stats")
def system_stats():
    """Expose GPU status, available RAM and training progress with histories."""

    memory = psutil.virtual_memory()
    cpu = psutil.cpu_percent()
    ram = memory.percent
    gpu = gpu_percent()

    for hist, value in (
        (GPU_HISTORY, gpu),
        (CPU_HISTORY, cpu),
        (RAM_HISTORY, ram),
    ):
        hist.append(value)
        if len(hist) > MAX_HISTORY:
            hist.pop(0)

    data = {
        "gpu_status": gpu_temperature(),
        "memory": f"{memory.available / (1024 ** 3):.1f} GB",
        "training": os.getenv("TRAINING_PROGRESS", "N/A"),
        "gpu": GPU_HISTORY,
        "cpu": CPU_HISTORY,
        "ram": RAM_HISTORY,
    }
    return jsonify(data)


if __name__ == "__main__":
    app.run(port=8001)


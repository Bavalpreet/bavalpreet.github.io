"""Simple Flask API providing system stats for the site."""

from flask import Flask, jsonify
import os
import platform
import psutil
import shutil
import subprocess

app = Flask(__name__)


def gpu_temperature() -> str:
    """Return a best-effort GPU temperature for the current machine."""

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

    try:
        temps = psutil.sensors_temperatures()
        for entries in temps.values():
            if entries:
                return f"{entries[0].current:.0f}°C"
    except Exception:
        pass

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


@app.get("/system/stats")
def system_stats():
    """Expose real-time GPU and RAM utilization."""

    memory = psutil.virtual_memory()
    gpu = gpu_percent()

    data = {
        "gpu_util": gpu,
        "ram_util": memory.percent,
        "training": os.getenv("TRAINING_PROGRESS", "N/A"),
    }
    return jsonify(data)


if __name__ == "__main__":
    app.run(port=8001)

"""Simple Flask API providing system stats for the site."""

from flask import Flask, jsonify
import os
import psutil
import subprocess


app = Flask(__name__)


def gpu_temperature() -> str:
  """Return GPU temperature using nvidia-smi if available."""
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
    return "N/A"


@app.get("/system/stats")
def system_stats():
  """Expose GPU status, available RAM and training progress."""
  memory = psutil.virtual_memory()
  data = {
      "gpu_status": gpu_temperature(),
      "memory": f"{memory.available / (1024 ** 3):.1f} GB",
      "training": os.getenv("TRAINING_PROGRESS", "N/A"),
  }
  return jsonify(data)


if __name__ == "__main__":
  app.run(port=8001)


import os
import time
from typing import Set, Tuple

import psutil
import requests
from dotenv import load_dotenv

load_dotenv()

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:4000")
MONITOR_SHARED_KEY = os.getenv("MONITOR_SHARED_KEY", "local-monitor-key")
USER_ID = os.getenv("USER_ID", "")
POLL_INTERVAL_SECONDS = float(os.getenv("POLL_INTERVAL_SECONDS", "1"))


def get_monitor_config() -> Tuple[bool, Set[str], Set[str]]:
    """Fetch active session state and blocked/whitelist app names."""
    if not USER_ID:
        return False, set(), set()

    response = requests.get(
        f"{BACKEND_URL}/api/focus/monitor/config/{USER_ID}",
        headers={"x-monitor-key": MONITOR_SHARED_KEY},
        timeout=3,
    )
    response.raise_for_status()
    data = response.json()

    active = bool(data.get("active"))
    blocked = {name.lower() for name in data.get("blocked", [])}
    whitelist = {name.lower() for name in data.get("whitelist", [])}
    return active, blocked, whitelist


def terminate_blocked_processes(blocked_apps: Set[str], whitelist: Set[str], previously_seen: Set[str]) -> Set[str]:
    current_names: Set[str] = set()
    for proc in psutil.process_iter(["name", "pid"]):
        name = (proc.info.get("name") or "").lower()
        if not name:
            continue

        current_names.add(name)
        if name in blocked_apps and name not in whitelist:
            try:
                psutil.Process(proc.info["pid"]).terminate()
                send_log(name, "blocked", f"Terminated {name}")
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                continue

    newly_opened = current_names - previously_seen
    for name in newly_opened:
        if name in blocked_apps and name not in whitelist:
            send_log(name, "warning", f"Detected newly opened blocked app: {name}")

    return current_names


def send_log(app_name: str, action: str, message: str) -> None:
    payload = {"userId": USER_ID, "appName": app_name, "action": action, "message": message}
    try:
        requests.post(
            f"{BACKEND_URL}/api/focus/monitor/log",
            headers={"x-monitor-key": MONITOR_SHARED_KEY},
            json=payload,
            timeout=3,
        ).raise_for_status()
    except requests.RequestException as exc:
        print(f"Failed sending log: {exc}")


def monitor_loop() -> None:
    print("Void Focus monitor service started...")
    seen: Set[str] = set()

    while True:
        try:
            active, blocked_apps, whitelist = get_monitor_config()
            if active:
                seen = terminate_blocked_processes(blocked_apps, whitelist, seen)
            else:
                seen = set()
        except Exception as exc:
            print(f"Monitor cycle error: {exc}")
        time.sleep(POLL_INTERVAL_SECONDS)


if __name__ == "__main__":
    monitor_loop()

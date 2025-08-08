import json
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def run_cli(*args: str) -> subprocess.CompletedProcess:
    return subprocess.run([sys.executable, "-m", "rob04", *args], cwd=ROOT, capture_output=True, text=True)


class TestCLI(unittest.TestCase):
    def test_version_exits_zero_and_prints_version(self):
        proc = run_cli("version")
        self.assertEqual(proc.returncode, 0)
        self.assertGreaterEqual(proc.stdout.strip().count("."), 2)

    def test_doctor_outputs_json(self):
        proc = run_cli("doctor")
        self.assertEqual(proc.returncode, 0)
        data = json.loads(proc.stdout)
        self.assertIn("python_version", data)
        self.assertIn("cwd", data)

    def test_hello_with_name(self):
        proc = run_cli("hello", "--name", "Rob04")
        self.assertEqual(proc.returncode, 0)
        self.assertIn("Hello, Rob04!", proc.stdout)
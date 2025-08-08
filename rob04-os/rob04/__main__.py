import argparse
import json
import os
import platform
import shutil
import sys
from typing import List

from .version import VERSION


def command_version(_: argparse.Namespace) -> int:
    print(VERSION)
    return 0


def command_doctor(_: argparse.Namespace) -> int:
    report = {
        "python_executable": sys.executable,
        "python_version": platform.python_version(),
        "platform": platform.platform(),
        "has_git": shutil.which("git") is not None,
        "cwd": os.getcwd(),
    }
    print(json.dumps(report, indent=2))
    return 0


def command_hello(args: argparse.Namespace) -> int:
    name = args.name or "world"
    print(f"Hello, {name}! Welcome to Rob04 OS.")
    return 0


def build_parser(argv: List[str]) -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="rob04", description="Rob04 OS developer CLI")
    subparsers = parser.add_subparsers(dest="command")

    subparsers.add_parser("version", help="Show CLI version").set_defaults(func=command_version)
    subparsers.add_parser("doctor", help="Check environment").set_defaults(func=command_doctor)

    hello_parser = subparsers.add_parser("hello", help="Say hello")
    hello_parser.add_argument("--name", "-n", help="Name to greet")
    hello_parser.set_defaults(func=command_hello)

    return parser


def main(argv: List[str] | None = None) -> int:
    argv = argv if argv is not None else sys.argv[1:]
    parser = build_parser(argv)
    args = parser.parse_args(argv)
    if not hasattr(args, "func"):
        parser.print_help()
        return 1
    return int(args.func(args))


if __name__ == "__main__":
    raise SystemExit(main())
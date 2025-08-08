# Rob04 OS

Rob04 OS is a bold, modern operating system project blending the best of iOS (polish), Linux (openness), and Windows (power). It is designed to be secure, modular, and scalable across desktop and mobile form factors.

## Vision

- User-first design with touch, voice, and traditional input support
- Strong security model with sandboxing, biometrics, encryption, and firewall
- Modular architecture: kernel, services, UI, and app layers are composable
- Compatibility for running legacy Windows/Linux apps via compatibility layers
- Thriving app ecosystem via the Rob04 Store and containerized apps
- Seamless networking and cloud sync
- Robust developer experience with SDKs, terminal, virtualization, and AI-assisted performance

For the full vision, see `docs/VISION.md` and `docs/ARCHITECTURE.md`.

## Status

This repository is at an early bootstrap phase. It currently ships with a Python-based CLI to orchestrate developer tools and prototype modules.

## Quick Start

Requirements: Python 3.9+

- Run the CLI help:

```bash
python -m rob04 --help
```

- Check your environment:

```bash
python -m rob04 doctor
```

- Show version:

```bash
python -m rob04 version
```

## Development

- Run tests:

```bash
make test
```

- Project layout:

```
rob04-os/
  rob04/              # CLI and orchestrator package
  tests/              # Unit tests
  docs/               # Vision, architecture, and roadmap
```

## License

MIT. See `LICENSE`.
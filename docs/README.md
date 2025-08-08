# Rob04 OS: Quick Start Guide

Welcome to the future! This guide will help you build and run the minimal Rob04 OS kernel in QEMU.

## Prerequisites
- Rust toolchain (installed via rustup)
- QEMU (for emulation)
- NASM (for assembly, if needed)

## Project Structure
- `/kernel` - The Rust kernel code
- `/bootloader` - Bootloader configuration (uses the `bootloader` crate)
- `/drivers` - (Reserved for future device drivers)
- `/userland` - (Reserved for future user applications)
- `/docs` - Documentation

## Building and Running

1. **Build the kernel and bootable image:**
   ```sh
   make build
   ```

2. **Run in QEMU:**
   ```sh
   make run
   ```

You should see:
```
Rob04 OS - Welcome to the Future!
```

## How it Works
- The kernel is written in Rust and uses VGA text mode to print the welcome message.
- The `bootloader` crate is used to create a bootable image for x86_64.
- QEMU emulates a PC and boots the image.

## Troubleshooting
- If you see build errors, ensure you have installed the Rust toolchain and added the `x86_64-unknown-none` target:
  ```sh
  rustup target add x86_64-unknown-none
  cargo install bootimage
  ```
- If QEMU is missing, install it with:
  ```sh
  sudo apt-get install qemu-system-x86
  ```

## Next Steps
- Explore the kernel code in `/kernel/src/main.rs`.
- Add new features, drivers, and userland programs!

---

Rob04 OS is just getting started. Welcome aboard!
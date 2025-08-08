# Makefile for Rob04 OS

KERNEL_TARGET = x86_64-unknown-none
KERNEL_BIN = target/$(KERNEL_TARGET)/debug/kernel
ISO = target/rob04os.iso

.PHONY: all build run clean

all: build

build:
	cd kernel && cargo bootimage

run: build
	qemu-system-x86_64 -drive format=raw,file=kernel/target/$(KERNEL_TARGET)/debug/bootimage-kernel.bin

clean:
	cd kernel && cargo clean
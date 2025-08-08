#![no_std]
#![no_main]

use core::panic::PanicInfo;

/// Entry point for the kernel. The bootloader will jump here.
#[no_mangle]
pub extern "C" fn _start() -> ! {
    // Print the welcome message to the screen using VGA text buffer
    vga_print("Rob04 OS - Welcome to the Future!");
    loop {}
}

/// Prints a string to the VGA text buffer (top left corner).
fn vga_print(s: &str) {
    let vga_buffer = 0xb8000 as *mut u8;
    for (i, byte) in s.bytes().enumerate() {
        unsafe {
            // Each character cell is 2 bytes: ASCII + color
            *vga_buffer.offset(i as isize * 2) = byte;
            *vga_buffer.offset(i as isize * 2 + 1) = 0x0f; // White on black
        }
    }
}

/// This function is called on panic. We just halt the CPU.
#[panic_handler]
fn panic(_info: &PanicInfo) -> ! {
    loop {}
}

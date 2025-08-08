import './globals.css';
import { ReactNode, useEffect, useState } from 'react';

export const metadata = {
  title: 'Rob04 Connect',
  description: 'Where technology meets emotion',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
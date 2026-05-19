import type { Metadata } from 'next';
import { APP_NAME } from '@monolith/config';
import './globals.css';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Monolith AI-Native Engineering Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

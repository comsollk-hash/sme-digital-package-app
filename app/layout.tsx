import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SME Digital Media Package | Communica Solutions',
  description: 'Interactive SME digital package price guide with calculator and PDF downloads.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

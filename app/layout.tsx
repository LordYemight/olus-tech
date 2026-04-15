import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const heading = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading', weight: ['700', '400'] });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: "Olu's Tech | Engineering the Digital Sovereignty of Lagos",
  description: "High-performance enterprise software led by Oluwadamilare.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
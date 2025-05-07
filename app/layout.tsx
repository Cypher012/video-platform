import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SimonSayys',
  description: 'This platform is a web-based live video call service',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

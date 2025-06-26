import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ai-component Gen',
  description: 'developer - Tanmay[Silent Programmer]',

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

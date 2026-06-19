import type { Metadata } from 'next'
import { Orbitron, Poppins } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/registry'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dheeraj Saxena — Coming Soon',
  description: 'Something worth waiting for. dheerajsaxena.dev is launching soon.',
  authors: [{ name: 'Dheeraj Saxena' }],
  metadataBase: new URL('https://dheerajsaxena.dev'),
  openGraph: {
    title: 'Dheeraj Saxena — Coming Soon',
    description: 'Something worth waiting for.',
    url: 'https://dheerajsaxena.dev',
    siteName: 'dheerajsaxena.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dheeraj Saxena — Coming Soon',
    description: 'Something worth waiting for.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${poppins.variable}`}>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}

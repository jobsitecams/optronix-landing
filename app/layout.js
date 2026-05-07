import './globals.css';

export const metadata = {
  title: 'Optronix Systems — Site Sentry Solutions',
  description:
    'Advanced security towers, radar speed signs, and monitoring solutions for construction, infrastructure, and critical sites.',
  icons: { icon: '/o-mark-app-icon-cyan.png' },
  openGraph: {
    title: 'Optronix Systems',
    description: 'Site Sentry Solutions — Security & Monitoring',
    type: 'website',
    url: 'https://optronix.systems',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

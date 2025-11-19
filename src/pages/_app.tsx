import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  )};

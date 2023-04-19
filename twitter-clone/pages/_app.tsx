import type { AppProps } from 'next/app';

import Layout from '@/components/Layout';
import '@/styles/globals.css';
import LoginModal from '@/components/modals/LoginModal';
// import Modal from '@/components/layout/Modal';

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    {/* <Modal actionLabel='Submit' isOpen title="Test Modal"/>  */}
    <LoginModal />
    <Layout>
      return <Component {...pageProps} />
    </Layout>
  </>
  )
}


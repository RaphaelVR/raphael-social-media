import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

import Layout from '@/components/Layout';
import '@/styles/globals.css';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import EditModal from '@/components/modals/EditModal';

// import Modal from '@/components/layout/Modal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
    <Toaster />
    {/* <Modal actionLabel='Submit' isOpen title="Test Modal"/>  */}
    <EditModal />
    <RegisterModal />
    <LoginModal />
    <Layout>
      return <Component {...pageProps} />
    </Layout>
    </SessionProvider>
  )
}


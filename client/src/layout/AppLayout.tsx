import React from 'react'
import { Outlet, useNavigation } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AppLayout = () => {
 const navigation = useNavigation();

  if (navigation.state === "loading") {
    return (
      <>
        <h1 className="text-center my-20 bg-violet-200 text-violet-700 rounded-xl px-4 py-2">loading...</h1>
      </>
    );
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout

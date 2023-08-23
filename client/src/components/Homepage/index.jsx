import React from 'react';
import Navbar from '../Navbar';
import FirstContainer from './FirstContainer';
import SecondContainer from './SecondContainer';
import HalfContainer from './HalfContainer';
import Footer from '../Footer';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <FirstContainer />
      <HalfContainer />
      <SecondContainer />
      <Footer />
    </>
  )
}

export default HomePage;
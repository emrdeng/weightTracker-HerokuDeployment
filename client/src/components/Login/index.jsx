import React from 'react';

import '../../public/css/App.css';
import '../../public/css/bootstrap-social.css';

import Navbar from '../Navbar';
import FullScreenContainer from '../../css-components/FullScreenContainer';
import LoginBox from './LoginBox';
import WelcomeTitle from './LoginBox/WelcomeTitle';
import {GoogleSignIn} from "../Icons/icons.jsx";
// import {FacebookSignIn, GoogleSignIn, InstagramSignIn} from "../Icons/icons.jsx";
import CenterTypography from '../../css-components/CenterTypography';

const Login = () => {
  const google = ()=>{
    window.open("http://localhost:5000/auth/google/callback", "_self")
  }
  return (
    <>
    <Navbar />
    <FullScreenContainer
      className='imageContainer'
      maxWidth={false}
    >
      
      <LoginBox
        maxWidth={false}
      >
        <WelcomeTitle title="Welcome Back"  />
        <GoogleSignIn toDo="Sign in" onClick={google}/>
        {/* <FacebookSignIn toDo="Sign in" />
        <InstagramSignIn toDo="Sign in" /> */}
        <hr className="fadedLine" style={{
          margin: "20px 20px",
        }} />
        <CenterTypography body="Not a member?" />
        <CenterTypography body="Register using your Google account below:" />
        <GoogleSignIn toDo="Register" onClick={google}/>
        {/* <FacebookSignIn toDo="Register" />
        <InstagramSignIn toDo="Register" /> */}
      </LoginBox>
      
    </FullScreenContainer>
    </>
  )
}

export default Login
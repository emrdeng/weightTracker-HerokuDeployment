import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const GoogleSignIn = (props) => {
  return (
    <a className="btn btn-block btn-social btn-google" onClick={()=>props.onClick()} style={{display:"inline-block", width: "60%", marginBottom:"10px"}}>
        <span><FontAwesomeIcon icon={faGoogle} /></span> {props.toDo} with Google
    </a>
  )
}

const FacebookSignIn = (props) => {
    return (
        <a className="btn btn-block btn-social btn-facebook" href="/auth/facebook" style={{display:"inline-block", width: "60%", marginBottom:"10px"}}>
        <span><FontAwesomeIcon icon={faFacebook} /></span> {props.toDo} with Facebook
    </a>
    )
}

const InstagramSignIn = (props) => {
  return (
      <a className="btn btn-block btn-social btn-instagram" href="/auth/instagram" style={{display:"inline-block", width: "60%", marginBottom:"10px"}}>
      <span><FontAwesomeIcon icon={faInstagram} /></span> {props.toDo} with Instagram
  </a>
  )
}



export {GoogleSignIn, FacebookSignIn, InstagramSignIn}
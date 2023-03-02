
import Image from 'next/image';
import styles from './page.module.css';
import { useState } from "react";
import logo from '../../public/logo.png';
import { Button } from 'antd';
import LoginModal from './auth/login/loginModal';
import SignUpModal from './auth/signup/signUpModal';


export default function Home() {
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openSignUp, setOpenSignUp] = useState<boolean>(false);

  const handleSignUp = () =>{
    setOpenSignUp(true);
  }

  const handleLogin = () =>{
    setOpenLogin(true);
  }


  return (
      <div className={styles.main}>
        <div className={styles.logo}>
            <Image
              src={logo}
              alt="BlockURS Logo"
              height="150"
              width="150"
            />
        </div>


        <div className={styles.text}>
          <p style={{fontSize: "20px"}}> A Blockchain-based System for Unified Reputation Score </p>
        </div>


        <div className={styles.button}>
          <Button type="primary" size="large" style={{minWidth: "100px"}} onClick={handleSignUp}> Sign Up </Button>
          <Button type="primary" size="large" style={{minWidth: "100px"}} onClick={handleLogin}> Login </Button>
        </div>

        <LoginModal open={openLogin} setOpen={setOpenLogin} />
        <SignUpModal open={openSignUp} setOpen={setOpenSignUp}/>

      </div>
  )
}

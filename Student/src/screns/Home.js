import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import backgroundImage from '../assets/al.jpg';
import 'aos/dist/aos.css'
import AOS from 'aos'
import Navbar from '../Component/Navbar';

const StyledMain = styled.main`
  background-image: linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.8)), url(${backgroundImage});
  background-size: cover;
  background-size: 100% 100%;
  height:100vh;
  background-position: center;
  position: relative;
`;

const StyledTextContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  
`;

const StyledTitle = styled.h1`
  font-weight: bold;
            font-size: 40px;
            color:white;
          text-shadow:5px 5px 5px black;
`;

const StyledDescription = styled.p`
 font-weight: bold;
            font-size: 40px;
            color:white;
          text-align:absolute;
          text-shadow:5px 5px 5px black;
`;

function Home() {

  useEffect(()=>{
    AOS.init({duration:1000})
  },[])
  return (
    <>
      <Navbar />
      <StyledMain>
        <section>
          
          <StyledTextContainer className='divcontainer'>
            <StyledTitle className='title' data-aos='fade-up'>WELCOME TO  </StyledTitle>
            <StyledTitle className='stitle' data-aos='fade-up'>KLE ALUMNI PORTAL</StyledTitle>
            <StyledDescription className='subtitle' data-aos='fade-up'>BELGAUM , KARNATAKA</StyledDescription>
          </StyledTextContainer>
        </section>
      </StyledMain>
      
      <style>
        {`
        @media screen and (max-width:768px)
        {
          .divcontainer{
            width:100vw;
          }
          .title{
            font-size:20px;
            width:100vw;
            text-align:center;
          }
          .stitle{
            font-size:30px;
            text-align:center;
          }
          .subtitle{
            font-size:16px;
            text-align:center;
          }
        }
        `}
      </style>
    </>
  );
}

export default Home;

import React, { useState, useEffect } from 'react';
import Navbar from '../Component/Navbar';
import login from '../assets/a.jpg'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { NavLink, useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Register = () => {
  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const [otp, setOtp] = useState('');
  const [isOTPVerificationEnabled, setIsOTPVerificationEnabled] = useState(false);

  // Validation state for fields
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    // Reset any previous error messages
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');

    let isValid = true;

    if (name.trim() === '') {
      setNameError('Name is required');
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      setNameError('Name should only contain letters and spaces');
      isValid = false;
    }
    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    }

    // Validate Phone
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      setPhoneError('Invalid phone number (10 digits required)');
      isValid = false;
    }

    // Validate Password
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    }

    return isValid;
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    // Validate the form
    if (!validateForm()) {
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/student/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, password })
      });
      const result = await res.json();
      console.log(res.status);
      if (res.status === 202) {
        setId(result.userId);
        alert('Email sent Successfully');
        setIsOTPVerificationEnabled(true);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred during registration');
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    // Validate the form
    if (!validateForm()) {
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/student/verifyotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, otp, name, email, phone, password })
      });

      const result = await res.json();
      if (res.status === 200) {
        alert('Email verified successfully!');
        navigate('/');
      } else if (res.status === 400) {
        alert('Code has expired. Please click resend again.');
      } else if (res.status === 401) {
        alert('Provided OTP is not correct');
      } else {
        alert('Error');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred during OTP verification');
    }
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();
    // Validate the form
    if (!validateForm()) {
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/student/resendotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, email })
      });
      alert('Email Sent Successfully');
      setIsOTPVerificationEnabled(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const Cancel = () => {
    setIsOTPVerificationEnabled(false);
  };

  return (
    <>
      <Navbar />

      <section className='loginsection  mt-2 mt-lg-0 p-lg-4 p-0  text-start'>
        <div className="container loginsection-subdiv">
          <div className="row loginsection-row p-2 shadow-lg" data-aos="zoom-in">
            <div className="col-lg-5 col-6 bg-light">
              {isOTPVerificationEnabled ? (
                <div>
                  <form onSubmit={handleOTPVerification}>
                    <div>
                      <ArrowCircleLeftOutlinedIcon className='fs-1 m-2' onClick={Cancel} />
                      <h4 className='ms-5 pt-1' style={{ fontFamily: 'times-new-roman' }}>Sign Up</h4>
                    </div>
                    <p className='ms-3 mb-3' style={{ fontFamily: 'times-new-roman', color: 'gray', fontStyle: 'italic', marginTop: '80px' }}>Verification OTP email sent to your entered email address </p>
                    <div style={{ marginTop: '30px' }}>
                      <label htmlFor="otp" className='me-3'>Enter OTP </label>
                      <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required /><br /><br />
                      <input type="submit" className='btn btn-primary' value="Verify OTP" />
                      <button className='btn btn-outline-primary ms-3' onClick={handleResendOTP}>Resend OTP</button>
                    </div>
                  </form>
                </div>
              ) : (
                <form className='p-3' onSubmit={handleRegistration}>
                  <h4 className='pt-1 ' style={{ fontFamily: 'times-new-roman' }}>Sign Up</h4>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)} />
                    <div className='text-danger'>{nameError}</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div className='text-danger'>{emailError}</div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-12">
                      <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      <div className='text-danger'>{phoneError}</div>
                    </div>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                      Password
                    </label>
                    <input type='password' className='form-control' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className='text-danger'>{passwordError}</div>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary mb-2 ">Sign Up</button>
                  </div>
                  <div className='mt-4 '>
                    <span>Already Have Account ? </span> <br /><NavLink type='submit' to='/login'>Sign In</NavLink>
                  </div>
                </form>
              )}
            </div>
            <div className="col-lg-7  p-0 col-6 ">
              <img src={login} alt="" className='img-fluid' style={{ height: "79vh" }} />
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
          .loginsection-subdiv{
            width: 85%; 
          }
          .loginsection-row{
            width: 100%;
          }

          @media screen and (max-width:768px)
          {
            .loginsection{
              width: 100vw; 
            }
            .loginsection-subdiv{
              height: 85vh!important; 
            }
            
            .loginsection-row{
              width: 100vw;
              
            }
            .container{
              width:100%;
            }
          }
        `}
      </style>
    </>
  );
};

export default Register;

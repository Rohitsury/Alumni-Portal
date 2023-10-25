import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function ForgotPassword() {
  let navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOTP = async () => {
    try {
      const res = await fetch('http://localhost:5000/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send only 'email' in the request body
      });

      const data = await res.json()
      console.log(data.user._id)
      if(res.status === 404)
      {
        alert(data.message)
      }
      else if(res.status  === 400)
      {
        alert(data.message)
      }
      else if(res.status  === 500)
      {
        alert(data.message)
      }
      else{
        setUserId(data.user._id)
        setOtpSent(true);
        setMessage('Verification OTP has been sent to your email.');
      }
    } catch (error) {
      setMessage('Error sending OTP. Please try again later.');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await fetch('http://localhost:5000/resetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId, email, otp, newPassword }),
      });

      const data = await res.json()
      if(res.status === 404)
      {
        alert(data.message)
      }
      else if(res.status  === 400)
      {
        alert(data.message)
      }
      else if(res.status  === 401)
      {
        alert(data.message)
      }

      else if(res.status  === 500)
      {
        alert(data.message)
      }
      setMessage('Password reset successful. Please log in with your new password.');
      setOtpSent(false);
      navigate('/login')
    } catch (error) {
      setMessage('Invalid OTP. Please check the code and try again.');
    }
  };

  return (
    <>
    <div className='d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
      <div className='shadow d-flex flex-column justify-content-center' style={{width:'70vh', height:'40vh'}}>
      <h2 className='text-center fw-bold'>Forgot Password</h2>
      {otpSent ? (
        <>
        <div className='text-center'>
          <input type="text" placeholder="Verification OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className='my-3' /> <br />
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}className='mb-3' /> <br />
          <button onClick={handleVerifyOTP} className='btn btn-primary w-50'>Verify OTP and Reset Password</button>
          </div>
        </>
      ) : (
        <>
        <div className='text-center'>
          <input type="email" placeholder="Enter your email " value={email} onChange={(e) => setEmail(e.target.value)}  className='my-3'/> <br />
          <button onClick={handleSendOTP} className='btn btn-primary w-25'>Send OTP</button>
          </div>
        </>
      )}
      <p>{message}</p>
      </div>
      </div>
    </>
  );
}

export default ForgotPassword;

import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import Navbar from '../Component/Navbar'


function Login() {
  let navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const handleSubmit = async (e) => {
    ;
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/student/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      const result = await res.json();
      if (res.status === 200) {
        alert('Looged in Successfull')
        localStorage.setItem('jwttoken', result.authtoken)
        navigate('/')
      }
      else {
        alert('Login failed. Invalid email or password.')
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Navbar />
      <section className='d-flex justify-content-center mt-5 p-4 p-lg-0'>
        <div class="wrapper">
          <div class="title">
            Login Form
          </div>
          <form action="#" onSubmit={handleSubmit}>
            <div class="field">
              <input type="email" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
              <label>Email Address</label>
            </div>
            <div class="field">
              <input type="password" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
              <label>Password</label>
            </div>
            <div class="field">
              <input type="submit" value="Login" />
            </div>
            <div className='signup-link'>
              <NavLink type='submit' to='/forgotpassword'>
                ForgotPassword?
              </NavLink>
            </div>
            <div className='signup-link'>
              Not a member? <NavLink type='submit' to='/register'>
                      Sign up
                    </NavLink>
            </div>
          </form>
        </div>
      </section>
      <style>
        {`
                @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
 
::selection{
  background: #4158d0;
  color: #fff;
}
.wrapper{
  width: 380px;
  background: ;
  border-radius: 15px;
  box-shadow: 0px 15px 20px rgba(0,0,0,0.1);
}
.wrapper .title{
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  line-height: 100px;
  color: #fff;
  user-select: none;
  border-radius: 15px 15px 0 0;
  background: linear-gradient(-135deg, #c850c0, #4158d0);
}
.wrapper form{
  padding: 10px 30px 50px 30px;
}
.wrapper form .field{
  height: 50px;
  width: 100%;
  margin-top: 20px;
  position: relative;
}
.wrapper form .field input{
  height: 100%;
  width: 100%;
  outline: none;
  font-size: 17px;
  padding-left: 20px;
  border: 1px solid lightgrey;
  border-radius: 25px;
  transition: all 0.3s ease;
}
.wrapper form .field input:focus,
form .field input:valid{
  border-color: #4158d0;
}
.wrapper form .field label{
  position: absolute;
  top: 50%;
  left: 20px;
  color: #999999;
  font-weight: 400;
  font-size: 17px;
  pointer-events: none;
  transform: translateY(-50%);
  transition: all 0.3s ease;
}
form .field input:focus ~ label,
form .field input:valid ~ label{
  top: 0%;
  font-size: 16px;
  color: #4158d0;
  background: #fff;
  transform: translateY(-50%);
}
form .content{
  display: flex;
  width: 100%;
  height: 50px;
  font-size: 16px;
  align-items: center;
  justify-content: space-around;
}
form .content .checkbox{
  display: flex;
  align-items: center;
  justify-content: center;
}
form .content input{
  width: 15px;
  height: 15px;
  background: red;
}
form .content label{
  color: #262626;
  user-select: none;
  padding-left: 5px;
}
form .content .pass-link{
  color: "";
}
form .field input[type="submit"]{
  color: #fff;
  border: none;
  padding-left: 0;
  margin-top: -10px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  background: linear-gradient(-135deg, #c850c0, #4158d0);
  transition: all 0.3s ease;
}
form .field input[type="submit"]:active{
  transform: scale(0.95);
}
form .signup-link{
  color: #262626;
  margin-top: 20px;
  text-align: center;
}
form .pass-link a,
form .signup-link a{
  color: #4158d0;
  text-decoration: none;
}
form .pass-link a:hover,
form .signup-link a:hover{
  text-decoration: underline;
}
                `}
      </style>
    </>
  )
}

export default Login
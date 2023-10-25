import React, { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userid, password }),
        });

        console.log(response);
        const data = await response.json();

        if (response.status === 400 || !data) {
            alert('Invalid Credentials');
        }
        else {
            alert('Logged in successfully');
            localStorage.setItem('jwttoken', data.authtoken)
            navigate('/dashboard');
        }
    };

    const handleCheckbox = (e) => {
        setIsChecked(e.target.checked)
    }
    return (
        < >

            <div class="login-wrap">
                <form class="login-html"  onSubmit={handleSubmit}>
                    <input id="tab-1" type="radio" name="tab" class="sign-in"  checked /><label for="tab-1" class="tab" >Admin Sign In</label>
                    <input id="tab-2" type="radio" name="tab" class="sign-up" /><label for="tab-2" class="tab"></label>
                    <div class="login-form">
                        <div class="sign-in-htm">
                            <div class="group">
                                <label for="user" class="label" className='text-white'>Username</label>
                                <input id="user" type="text" class="input" value={userid} onChange={(e) => setUserid(e.target.value)} />
                            </div>
                            <div class="group">
                                <label for="pass" class="label" className='text-white'>Password</label>
                                <input id="pass" type={isChecked ? "text" : "password"} class="input" value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div class="group">
                                <input type="checkbox" id="remember-me" onChange={handleCheckbox} />
                                <label className='text-white' for="remember-me">Show Password</label>
                            </div>
                            <div class="group">
                                <input type="submit" class="button" value="Sign In" />
                            </div>
                            <div class="foot-lnk">

                                    <NavLink className='text-white' type='submit' to='/forgotpassword'>
                                        ForgotPassword?
                                    </NavLink>
                                </div>
                        </div>

                    </div>
                </form>
            </div>
            <style>
                {`
                      .clearfix:after{clear:both;display:block}
                      a{color:inherit;text-decoration:none}
                      
                      .login-wrap{
                          width:100%;
                          margin:auto;
                          margin-top:6rem;
                          max-width:525px;
                          min-height:570px;
                          position:relative;
                          background:url(https://raw.githubusercontent.com/khadkamhn/day-01-login-form/master/img/bg.jpg) no-repeat center;
                          box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
                      }
                      .login-html{
                          width:100%;
                          height:100%;
                          position:absolute;
                          padding:90px 70px 50px 70px;
                          background:rgba(40,57,101,.9);
                      }
                      .login-html .sign-in-htm,
                      .login-html .sign-up-htm{
                          top:0;
                          left:0;
                          right:0;
                          bottom:0;
                          position:absolute;
                          transform:rotateY(180deg);
                          backface-visibility:hidden;
                          transition:all .4s linear;
                      }
                      .login-html .sign-in,
                      .login-html .sign-up,
                      .login-form .group .check{
                          display:none;
                      }
                      .login-html .tab,
                      .login-form .group .label,
                      .login-form .group .button{
                          text-transform:uppercase;
                      }
                      .login-html .tab{
                          font-size:22px;
                          margin-right:15px;
                          padding-bottom:5px;
                          margin:0 15px 10px 0;
                          display:inline-block;
                          border-bottom:2px solid transparent;
                      }
                      .login-html .sign-in:checked + .tab,
                      .login-html .sign-up:checked + .tab{
                          color:#fff;
                          border-color:#1161ee;
                      }
                      .login-form{
                          min-height:345px;
                          position:relative;
                          perspective:1000px;
                          transform-style:preserve-3d;
                      }
                      .login-form .group{
                          margin-bottom:15px;
                      }
                      .login-form .group .label,
                      .login-form .group .input,
                      .login-form .group .button{
                          width:100%;
                          color:#fff;
                          display:block;
                      }
                      .login-form .group .input,
                      .login-form .group .button{
                          border:none;
                          padding:15px 20px;
                          border-radius:25px;
                          background:rgba(255,255,255,.1);
                      }
                      .login-form .group input[data-type="password"]{
                          text-security:circle;
                          -webkit-text-security:circle;
                      }
                      .login-form .group .label{
                          color:#aaa;
                          font-size:12px;
                      }
                      .login-form .group .button{
                          background:#1161ee;
                      }
                      .login-form .group label .icon{
                          width:15px;
                          height:15px;
                          border-radius:2px;
                          position:relative;
                          display:inline-block;
                          background:rgba(255,255,255,.1);
                      }
                      .login-form .group label .icon:before,
                      .login-form .group label .icon:after{
                          content:'';
                          width:10px;
                          height:2px;
                          background:#fff;
                          position:absolute;
                          transition:all .2s ease-in-out 0s;
                      }
                      .login-form .group label .icon:before{
                          left:3px;
                          width:5px;
                          bottom:6px;
                          transform:scale(0) rotate(0);
                      }
                      .login-form .group label .icon:after{
                          top:6px;
                          right:0;
                          transform:scale(0) rotate(0);
                      }
                      .login-form .group .check:checked + label{
                          color:#fff;
                      }
                      .login-form .group .check:checked + label .icon{
                          background:#1161ee;
                      }
                      .login-form .group .check:checked + label .icon:before{
                          transform:scale(1) rotate(45deg);
                      }
                      .login-form .group .check:checked + label .icon:after{
                          transform:scale(1) rotate(-45deg);
                      }
                      .login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{
                          transform:rotate(0);
                      }
                      .login-html .sign-up:checked + .tab + .login-form .sign-up-htm{
                          transform:rotate(0);
                      }
                      
                      .hr{
                          height:2px;
                          margin:60px 0 50px 0;
                          background:rgba(255,255,255,.2);
                      }
                      .foot-lnk{
                          text-align:center;
                      }
                        `}
            </style>
        </>
    )
}

export default Login
import React from 'react'
import logoImage from '../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
function Navbar() {
  let navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('jwttoken')
    navigate('/')
  }

  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
        <div className="container">
          <div className='dsmflex'>
            <h6 className="navbar-brand " href="#"> <img src={logoImage} alt="Logo" className="logo" /> ALUMNI PORTAL</h6>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link ms-lg-3 ms-0 " activeClassName="active" exact aria-current="page" to='/'>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link ms-lg-3 ms-0 " activeClassName="active" exact aria-current="page" to="/about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link ms-lg-3 ms-0 " activeClassName="active" exact aria-current="page" to="/search">Search</NavLink>
              </li>
              {
                !localStorage.getItem('jwttoken') ? (
                  <>
                    <li className="nav-item me-0 me-lg-2">
                      <NavLink className="nav-link ms-lg-3 w-100 text-white fw-bold btn btn-primary ms-0 mt-2 mt-lg-0" activeClassName="active" exact aria-current="page" to="/Login">SignIn</NavLink>
                    </li>
                    <li className="nav-item ">
                      <NavLink className="nav-link text-white btn btn-primary fw-bold ms-lg-3 w-100 ms-0 mt-2 mt-lg-0" activeClassName="active" exact aria-current="page" to="/register">SignUp</NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link ms-lg-3 ms-0 " to='/event'>Event</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="btn btn-danger ms-lg-3 ms-0  mt-2 mt-lg-0" onClick={handleLogout}>Logout</NavLink>
                    </li>
                  </>
                )}
            </ul>

          </div>
        </div>
      </nav>

      <style>
        {`
            header {
          background-color:#faebd7;
          padding: 8px;
          display: flex;
          align-items: center;
        }

        .navbar {
              background: rgb(238,174,202);
              background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.8);
            padding: 8px;
            display: flex;
            align-items: center;
          }

          .logo {
          width: 180px;
          height: auto;
          margin-right: 10px;
        }
        .active{
          background-color:#faebd7;
          border-radius:3px;
        }
     
        .navbar-brand{
            font-weight: bold;
            font-size: 30px;
            color:white;
            text-alig:absolute;
            text-shadow:5px 5px 5px white;
          }

          @media screen and (max-width:768px)
          {
            .logo{
              width: 80px;
            }
            .navbar-brand{
              font-size: 16px;
              
            }
            .dsmflex{
              display:flex;
              justify-content:space-between;
              width:100%;
            }
            .nav-item{
              width:20%;
            }
            .nav-item .nav-link{
             text-align:center;
            }
            
          }
        
        
            `}
      </style>
    </>
  )
}

export default Navbar
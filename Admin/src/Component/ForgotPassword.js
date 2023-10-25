import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';


function ForgotPassword() {
    let navigate = useNavigate()
    const [frtuserid, setFrtUserid] = useState('');
    const [frtpassword, setFrtPassword] = useState('');
    const [key, setKey] = useState('');
    const handlePassword = async (e) => {
        e.preventDefault();
        const reset = {
            password: frtpassword,
            key: key

        };
        try {
            const res = await fetch(`http://localhost:5000/admin/forgotpassword/${frtuserid}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reset)
            })
            if (res.status === 200) {
                alert("Password Reset Succesfully")
                navigate('/')
            }
            if (res.status === 400) {
                alert("Invalid key")
            }
        } catch (err) {
            console.log(err)
        }
    }
    const close = () => {
      navigate('/')
    }
    return (
        <div className='container-fluid'>
          <div className='row justify-content-center align-items-center  ' style={{ minHeight: '100vh', width:'100vw' }}>
            <div className='col-md-4 ' >
              <div className="card shadow">
                <div className="card-header bg-light  d-flex">
                
                  <h5 className="fw-bold text-center ms-auto" style={{ color: "#ff0080" }}>Forgot Password</h5>
                  <button className="close-btn ms-auto" onClick={close}><CloseIcon /></button>
                </div>
                <div className="card-body  d-flex justify-content-center w-100">
                  <form onSubmit={handlePassword}>
                    <div className="form-group text-center fw-bold  ">
                      <label htmlFor="frtUserid text-center">User ID</label>
                      <input type="text" className="form-control text-center" id="frtUserid" value={frtuserid} onChange={(e) => setFrtUserid(e.target.value)} placeholder="Enter User ID" />
                    </div>
                    <div className="form-group text-center ">
                      <label htmlFor="key" className='fw-bold'>Key</label>
                      <input type="text" className="form-control" id="key" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Enter Key" />
                    </div>
                    <div className="form-group text-center fw-bold  ">
                      <label htmlFor="frtPassword">New Password</label>
                      <input type="password" className="form-control" id="frtPassword" placeholder="Enter New Password" value={frtpassword} onChange={(e) => setFrtPassword(e.target.value)} />
                    </div>
                    <div className="form-check text-center fw-bold">
                      {/* <input type="checkbox" className="form-check-input" id="exampleCheck1" /> */}
                      {/* <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label> */}
                    </div>
                    <div className='text-center' >
                    <button type="submit" className="btn btn-primary  fw-bold ms-auto ">Submit</button>
                    </div>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}  
export default ForgotPassword
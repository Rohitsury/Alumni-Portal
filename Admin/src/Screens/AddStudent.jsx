import React, { useState, useEffect } from 'react';
import Sidebar from '../Component/Sidebar';
import { useNavigate } from 'react-router-dom';

function AddStudent() {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('BE[CHEMICAL]');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');

  const [postImage, setPostImage] = useState('')

  let navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const nameRegex = /^[a-zA-Z\s]*$/; // Only allows letters and spaces
    if (!name.match(nameRegex) || name === '') {
      alert('Invalid name. Name should only contain letters and spaces.');
      return;
    }
    
  
    // Phone number validation
    const phoneRegex = /^[6-9]\d{9}$/; // Matches 10-digit numbers starting with 6, 7, 8, or 9
    if (!phone.match(phoneRegex) || phone === '') {
      alert('Invalid phone number. Phone number should be 10 digits starting with 6, 7, 8, or 9.');
      return;
    }
    try {
      const newItem = {name,department,from,to,email,phone,role,address,img:postImage};

      await fetch('http://localhost:5000/admin/addstudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });
      alert('Item added successfully!');

      navigate('/addstudent');
    } catch (err) {
      console.error(err);
      alert('Failed to add item.');
    }
  };


  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await converToBase64(file);
    setPostImage(base64);
  }


  return (
    <>
      <div className="row">
        <Sidebar />
        <div className="col-lg-10 two">
          <div className="row mt-3 px-3">
            <form onSubmit={handleFormSubmit}>
              <h3 className='mt-4' style={{ fontFamily: 'times-new-roman', fontStyle: 'italic' }}>Add New Student</h3>
              <div className="row mt-3">
                <div class="form-group col-4">
                  <labe>Student Name</labe>
                  <input type="text" class="form-control" placeholder="Enter Student Name"  value={name}
                  onChange={(e) => setName(e.target.value)} />
                </div>
                <div class="form-group col-4">
                  <label>Department</label>
                  <select class="form-control" id="departmentSelect" name="department" value={department}
                  onChange={(e) => setDepartment(e.target.value)} >
                    <option value="BE[CHEMICAL]">Bachelor of Engineering [CHEMICAL]</option>
                    <option value="BE[CIVIL]">Bachelor of Engineering [CIVIL]</option>
                    <option value="BE[CSE]">Bachelor of Engineering [CSE]</option>
                    <option value="BE[E&C]">Bachelor of Engineering [E&C]</option>
                    <option value="BE[E&C]">Bachelor of Engineering [E&E]</option>
                    <option value="MTech">Master Of Technology</option>
                    <option value="MBA">Master Of Business Administration </option>
                    <option value="MCA">Master Of Computer Application </option>
                  </select>
                </div>
              </div>
              <div className="row mt-3">
                <div class="form-group col-2">
                  <labe>From</labe>
                  <input type="date" class="form-control" placeholder="Enter Start Date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}  />
                </div>
                <div class="form-group col-2">
                  <labe>To</labe>
                  <input type="date" class="form-control" placeholder="Enter End Date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}  />
                </div>
                <div class="form-group col-4">
                  <labe>Email</labe>
                  <input type="email" class="form-control" placeholder="Enter Student Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="row mt-3">
                <div class="form-group col-4">
                  <labe>Phone</labe>
                  <input type="number" class="form-control" placeholder="Enter Student Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}  />
                </div>
                <div class="form-group col-4">
                  <labe>Now</labe>
                  <input type="text" class="form-control" placeholder="Enter Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}  />
                </div>
              </div>
              <div className="row mt-3">
                <div class="form-group col-8">
                  <labe>Address</labe>
                  <textarea type="text" class="form-control" placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}  />
                </div>

              </div>
              <div className="row mt-3">
                <div className="col-4">
                  <label htmlFor="linkInput">Select Photo</label>
                  <input
                    type="file"
                    label="image"
                    name="img"
                    className="form-control"
                    accept=".jpeg, .png, .jpg"
                    onChange={handleFileUpload}
                  />
                </div>
                 
              </div>

              <button type="submit" class="btn btn-primary mt-4">Submit</button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}



function converToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}
export default AddStudent;
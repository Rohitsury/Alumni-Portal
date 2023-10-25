import React, { useEffect, useState } from 'react'
import './style/style.css'
import Sidebar from '../Component/Sidebar'
import profile from '../Component/profile.jpg'
import CloseIcon from '@mui/icons-material/Close';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [modal, setModal] = useState(false)
  const [id, setId] = useState('')
  const [minPassoutYear, setMinPassoutYear] = useState(null);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');
  const [postImage, setPostImage] = useState({ img: "" })
  const [Open, setOpen] = useState(false);
  
  const getYearFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };
  const fetchStudentData = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/studentData');
      const data = await response.json();
      setStudents(data);
      const minYear = Math.min(...data.map((student) => getYearFromDate(student.to)));
      setMinPassoutYear(minYear);
    } catch (err) {
      console.log(err);
    }
  };

  
  const filteredStudents = students.filter((student) => {
    const hasSelectedBranch =
      selectedBranch === 'all' || student.department === selectedBranch;

    const hasSelectedYear =
      selectedYear === 'all' || getYearFromDate(student.to) === parseInt(selectedYear);

    if (!searchTerm) {
      return hasSelectedBranch && hasSelectedYear;
    }

    const searchSkills = searchTerm.toLowerCase().split(', ');

    const hasName = searchSkills.every((name) =>
      student.name.toLowerCase().startsWith(name)
    );

    return hasSelectedBranch && hasSelectedYear && hasName;
  });

  const sortStudentsByName = () => {
    const sortedStudents = [...filteredStudents];
    sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
    return sortedStudents;
  };

  const handleUpdate = async (id) => {
    console.log(id)
    try {
      const newItem = {
        name,
        department,
        from,
        to,
        email,
        phone,
        role,
        address,
        img: postImage.img
      };
      const res = await fetch(`http://localhost:5000/admin/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });
      const data = await res.json();
      if (res.status === 200) {
        alert('Successfully Updated');
        fetchStudentData()
        setModal(false);
      } else {
        alert('Error while updating');
      }
    } catch (err) {
      console.log(err);
    }
  }


  const OpenModal = (student) => {
    setModal(true);
    setId(student._id)
    setName(student.name);
    setDepartment(student.department);
    setFrom(student.from);
    setTo(student.to);
    setEmail(student.email);
    setPhone(student.phone);
    setRole(student.role);
    setAddress(student.address);
    setPostImage({ img: student.img });
  }

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are Your Sure!?")
      if (confirmed) {
        const res = await fetch(`http://localhost:5000/admin/${id}`, {
          method: 'DELETE'
        })
        fetchStudentData()
      }

    } catch (err) {
      console.log(err)
    }
  }

  const close = () => {
    setOpen(false);
    setModal(false)
  };


  useEffect(() => {
    fetchStudentData();
  }, []);


  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await converToBase64(file);
    setPostImage(base64);
  }
  return (
    <>
      <div className="row ">
        <Sidebar />
        <div className="col-lg-10 two" >
        <section className='mt-4 mb-4 text-dark'>
            <div className='container'>
              <form id='search-form'>
                <label htmlFor='search-input' className='me-2 text-dark'>
                  Enter Student Name
                </label>
                <input
                  type='text'
                  id='search-input'
                  name='search'
                  placeholder='Enter Student Name'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <label htmlFor='category-select' className='me-2 ms-4 '>
                  Select Department
                </label>
                <select
                  id='category-select'
                  name='department'
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                >
                  <option value='all'>All</option>
                  <option value='BE[CHEMICAL]'>Bachelor of Engineering [CHEMICAL]</option>
                  <option value='BE[CIVIL]'>Bachelor of Engineering [CIVIL]</option>
                  <option value='BE[CSE]'>Bachelor of Engineering [CSE]</option>
                  <option value='BE[E&C]'>Bachelor of Engineering [E&C]</option>
                  <option value='BE[E&E]'>Bachelor of Engineering [E&E]</option>
                  <option value='MTech'>Master Of Technology</option>
                  <option value='MBA'>Master Of Business Administration</option>
                  <option value='MCA'>Master Of Computer Application</option>
                </select>

                <label htmlFor='year-select' className='me-2 ms-4'>
                  Select Passout Year
                </label>
                <select
                  id='year-select'
                  name='year'
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value='all'>All</option>
                  {minPassoutYear &&
                    [...Array(new Date().getFullYear() - minPassoutYear + 1)].map((_, index) => (
                      <option key={index} value={minPassoutYear + index}>
                        {minPassoutYear + index}
                      </option>
                    ))}
                </select>
              </form>
            </div>
          </section>

          <section className=' shadow'>
            <div className='container'>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th></th>
                    <th>Student Name</th>
                    <th>Student Email</th>
                    <th>From</th>
                    <th>to</th>
                    <th>Department</th>
                    <th>Current </th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sortStudentsByName().map((student, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {student.img ?
                          (<img src={student.img} alt={student.name} />
                          ) :

                          (<img src={profile} alt={student.name} />)
                        }
                      </td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{getYearFromDate(student.from)}</td>
                      <td>{getYearFromDate(student.to)}</td>
                      <td>{student.department}</td>
                      <td>{student.role}</td>
                      <td><button className='btn btn-primary' onClick={() => OpenModal(student)}>Update</button></td>
                      <td><button className='btn btn-danger' onClick={() => handleDelete(student._id)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {
          modal && (
            <div className={`separate-div  ${Open ? 'open' : ''}`} >
              <div className=" separate-div-content shadow bg-white" style={{ width: "80%", height: "80%" }}>
                <nav class="navbar  justify-content-between">

                  <div></div>

                  <button className="close-btn mx-auto mx-sm-0 " onClick={close}> <CloseIcon />  </button>
                </nav>
                <div className="col-lg-10 two">
                  <div className="row ">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate(id);
                    }}>
                      <h3 className='text-dark' style={{ fontFamily: 'times-new-roman', fontStyle: 'italic' }}>Update Student Details</h3>
                      <div className="row mt-3">
                        <div class="form-group col-4">
                          <labe>Student Name</labe>
                          <input type="text" class="form-control" placeholder="Enter Student Name" value={name}
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
                            onChange={(e) => setFrom(e.target.value)} />
                        </div>
                        <div class="form-group col-2">
                          <labe>To</labe>
                          <input type="date" class="form-control" placeholder="Enter End Date"
                            value={to}
                            onChange={(e) => setTo(e.target.value)} />
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
                            onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div class="form-group col-4">
                          <labe>Now</labe>
                          <input type="text" class="form-control" placeholder="Enter Role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)} />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div class="form-group col-8">
                          <labe>Address</labe>
                          <textarea type="text" class="form-control" placeholder="Enter Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                        </div>

                      </div>
                      <div className="row mt-3">
                        <div class="col-4">
                          <label for="linkInput">Select Photo</label>
                          <input type="file" label="image" name="img" class="form-control" accept='.jpeg, .png, .jpg' onChange={(e) => handleFileUpload(e)} />
                        </div>

                      </div>

                      <button type="submit" class="btn btn-primary mt-4">Update</button>

                    </form>
                  </div>
                </div>
              </div>
            </div>


          )
        }
      </div>
      <style>
        {`
          .separate-div {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color:rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fade-in 0.4s ease;
          }
          .separate-div.open {
            animation: zoom-in 0.4s ease;
          }

          @keyframes fade-in {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes zoom-in {
            0% {
              opacity: 0;
              transform: scale(0.6);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .separate-div-content {        
            padding: 20px;
            border-radius:10px;
            // background: white;
            position: absolute;
            background: black;
            color:white;
            box-shadow:0 0 15px 15px rgba(0,0,0,.8)
          }
                  table {
                    width: 100%;
                    border-collapse: collapse;
                  }
          
                  th, td {
                    padding: 8px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                  }
          
                  td img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                  }
          
                  @media screen and (max-width: 600px) {
                    table {
                      border: 1px solid #ccc;
                    }
                    th, td {
                      display: block;
                      width: 100%;
                    }
                    th {
                      text-align: center;
                    }
                  }

                    
                
              `}

      </style>
    </>
  )
}

export default Dashboard

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
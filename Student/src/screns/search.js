import React, { useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import { useNavigate } from 'react-router-dom';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import defaultimg from '../assets/default.png'
function Dashboard() {
  let navigate = useNavigate()
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [minPassoutYear, setMinPassoutYear] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStudentData();
  }, []);

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

  function getYearFromDate(dateString) {
    const date = new Date(dateString);
    return date.getFullYear();
  }

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

  const openModal = (student) => {
    const isLoggedIn = localStorage.getItem('jwttoken')
    if (isLoggedIn) {
      setSelectedStudent(student);
      setIsModalOpen(true);
    } else {
      // Redirect to the login page
      navigate('/login')
    }
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <section className=''>
        <div className='row '>
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

          <section className='card-section'>
            <div className='container-fluid'>
              <div className='row'>
                {sortStudentsByName().map((student, index) => (
                  <div className='col-md-2 mb-4' key={index}>
                    <div className='card h-100 shadow'>
                      <div className='card-body'>
                        <img
                          src={student.img}
                          alt={student.name}
                          className='img-fluid rounded-circle me-2 mb-2'
                          style={{ width: '80px', height: '80px' }}
                        />
                        <div>
                          <h5 className='card-title' style={{ fontSize: '18px' }}>
                            {student.name}
                          </h5>
                          <p className='card-text text-secondary' style={{ fontSize: '14px' }}>
                            {student.role}
                          </p>
                          <button className='btn btn-primary btn-sm' onClick={() => openModal(student)}>View</button>

                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>



          {isModalOpen && selectedStudent && (
            <div className='modal-container'>
              <div className='modal-content  w-50 d-flex justify-content-center' style={{ borderRadius: '30px', height:'60vh' }}>
                <div className='profile-section  shadow text-center h-100' style={{ borderRadius: '30px' }}>
                  
                  <img
                    src={selectedStudent.img ? selectedStudent.img : defaultimg }
                    className='img-fluid rounded-circle me-2 mb-2 profile-image'
                  />
                  <div className='profile-details'>
                    <h4 className='card-title fw-bold' style={{textTransform:'uppercase'}}>{selectedStudent.name}</h4>
                    <p className='card-text text-secondary'>{selectedStudent.role}</p>
                    <p className='card-text '>Department : {selectedStudent.department}</p>
                    <div>
                      <span className='card-text mx-3'>Email: {selectedStudent.email}</span>
                      <span className='card-text'>Phone: {selectedStudent.phone}</span> </div>
                      <div>
                    <span className='card-text mx-3'>From: {new Date(selectedStudent.from).toLocaleDateString()}</span>
                    <span className='card-text'>To: {new Date(selectedStudent.to).toLocaleDateString()}</span>
                    </div>
                    <p className='card-text'>Address: {selectedStudent.address}</p>
                    {/* Add other information you want to display */}
                    <button className='btn btn-primary' onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

          )}
        </div>
      </section>
      <style>
        {`
    .modal-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.5); /* Add a background blur effect */
      z-index: 9999;
    }

    .modal-content {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    /* Add any additional styles for the profile section and details */
    .profile-section {
      /* Add your styles here */
    }

    .profile-image {
      width:100px;
      height:100px;
    }

    .profile-details {
      /* Add your styles here */
    }
  `}
      </style>
    </>
  );
}

export default Dashboard;

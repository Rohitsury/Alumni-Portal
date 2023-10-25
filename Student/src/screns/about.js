import React from 'react';
import Navbar from '../Component/Navbar';

function About() {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}
  return (
    <>
      <Navbar/>
      <h2 className='text-center mt-2 mt-lg-0'>About Us</h2>
      <div className="container shadow-lg text-start p-4">
      <p>KLE Dr.M S Sheshgiri College of Engineering and Technology, Belagavi belongs to KLE Society,
       a society which has a legacy of 102 years in the field of Education and is one of the largest education societies in the Asia continent <br /> <br />
       Established in the year 1979, KLE DR.MSSCET is a Self-financing, Non-Autonomous and an ISO 9001:2015 Certified Institution approved by AICTE, New Delhi and Permanently Affiliated to Visvesvaraya Technological University, Belagavi. All the Seven B. E. Courses (Civil, Mechanical, E & E, E & C, CSE, Chemical and Biomedical Engineering) are accredited by National Board of Accreditation (NBA), New Delhi. The Institution is recognized under Section 2(f) of UGC Act 1956. The Institute conducts a full range of academic activities in the field of Engineering and Management education covering research, teaching, training, consulting and intellectual infrastructure development. The Institute focuses on holistic development of students by adopting the most innovative and creative dimension to impart quality education and employability skills<br /><br />
      The college aims to positively impact the student’s lives by making premium education affordable and accessible to everyone. We believe that for learning to be effective, it needs to be delivered in a congenial environment that not just nurtures but stimulates the interest of the best minds that receive it. KLE DR.MSSCET offers a world-class infrastructure that supports the pursuit of knowledge and the exercise of individual interests.<br /> <br />
      The institution presently offers 7 Under Graduate and 7 Post Graduate (M.Tech) programmes in various disciplines of Engineering including M. C. A. and M. B. A for graduates of various disciplines. With 11 departments recognized by VTU as research centers and state of art facilities for doing quality research, the college is one of the most preferred places for doing research and doctoral programmes by academicians and research scholars in North Karnataka.</p>
       
       </div>
      {/* Add more content as needed */}
    </>
  );
}

export default About;

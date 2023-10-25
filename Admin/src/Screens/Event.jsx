import React, { useState, useEffect } from 'react'
import Sidebar from '../Component/Sidebar'
import HideImageRoundedIcon from '@mui/icons-material/HideImageRounded';
import CloseIcon from '@mui/icons-material/Close';

function Event() {
    const [event, setEvent] = useState([])
    const [eventname, setEventname] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [postImage, setPostImage] = useState('')
    const [modal, setModal] = useState(false)
    const [id, setId] = useState('')
    const [Open, setOpen] = useState(false);


    const close = () => {
        setOpen(false);
        setModal(false)
    };

    const fetchEvent = async () => {
        try {
            const res = await fetch('http://localhost:5000/admin/events')
            const data = await res.json()
            console.log(data)
            setEvent(data)

        } catch (err) {
            console.log(err)
        }

    }
    const OpenModal = (event) => {
        setModal(true);
        setId(event._id)
        console.log(id)
        setEventname(event.eventname);
        setDate(event.date);
        setTime(event.time);
        setDescription(event.description);
        setPostImage(event.img || '' );
    }

    const handleUpdate = async (id) => {
        try {
            const newItem = {
                eventname,
                date,
                time,
                description,
                img: postImage
            };
            const res = await fetch(`http://localhost:5000/admin/updatevent/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            });
            const data = await res.json();
            if (res.status === 200) {
                alert('Successfully Updated');
                fetchEvent()
                setModal(false);
            } else {
                alert('Error while updating');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        try {
            const confirmed = window.confirm("Are Your Sure!?")
            if (confirmed) {
                const res = await fetch(`http://localhost:5000/admin/event/${id}`, {
                    method: 'DELETE'
                })
                fetchEvent()
            }

        } catch (err) {
            console.log(err)
        }
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await converToBase64(file);
        setPostImage(base64);
    }

    useEffect(() => {
        fetchEvent();

    }, [])

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }



    return (
        <>
            <div className="row">
                <Sidebar />
                <div className="col-lg-10 two">
                    <div className="row mt-3 px-3">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Desciption</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    event.map((events, index) => (
                                        <tr key={index}>
                                            {
                                                events.img ? (
                                                    <td><img src={events.img} />
                                                    </td>
                                                ) : (
                                                    <td>
                                                        <HideImageRoundedIcon className='fs-1 rounded-3' />
                                                    </td>
                                                )
                                            }
                                            <td>{events.eventname}</td>
                                            <td>{formatDate(events.date)}</td>
                                            <td>{events.time}</td>
                                            <td>{events.description}</td>
                                            <td><button className='btn btn-primary' onClick={() => OpenModal(events)}>Update</button></td>
                                            <td><button className='btn btn-danger' onClick={() => handleDelete(events._id)}>Delete</button></td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                    </div>

                    {
                        modal && (
                            <div className={`separate-div  ${Open ? 'open' : ''}`} >
                                <div className=" separate-div-content shadow bg-white" style={{ width: "60%", height: "80%" }}>
                                    <nav class="navbar  justify-content-between">
                                        <button className="close-btn mx-auto mx-sm-0 " onClick={close}> <CloseIcon />  </button>
                                    </nav>
                                    <div className="col-lg-10 two">
                                        <div className="row mt-3 px-3">
                                            <form className='text-dark' onSubmit={(e) => {
                                                e.preventDefault();
                                                handleUpdate(id);
                                                 
                                            }}>
                                                <h3 className='mt-4 text-dark' style={{ fontFamily: 'times-new-roman', fontStyle: 'italic' }}>Update Event</h3>
                                                <div className="row mt-3">
                                                    <div class="form-group col-4">
                                                        <labe>Event Name</labe>
                                                        <input type="text" class="form-control" placeholder="Enter Student Name" value={eventname}
                                                            onChange={(e) => setEventname(e.target.value)} />
                                                    </div>

                                                </div>
                                                <div className="row mt-3">

                                                    <div class="form-group col-2">
                                                        <labe>Date</labe>
                                                        <input type="date" class="form-control" placeholder="Enter Date"
                                                            value={date}
                                                            onChange={(e) => setDate(e.target.value)} />
                                                    </div>
                                                    <div class="form-group col-4">
                                                        <labe>TIming</labe>
                                                        <input type="time" class="form-control" placeholder="Enter Event Timing"
                                                            value={time}
                                                            onChange={(e) => setTime(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div class="form-group col-4">
                                                        <labe>Description</labe>
                                                        <input type="text" class="form-control" placeholder="Enter More about Event"
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)} />
                                                    </div>

                                                </div>

                                                <div className="row mt-3">
                                                    <div class="col-4">
                                                        <label for="linkInput">Select Banner Photo</label>
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
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                `}
            </style>
        </>

    )
}

export default Event


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


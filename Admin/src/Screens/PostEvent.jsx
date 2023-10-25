import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Component/Sidebar'
function PostEvent() {
    const [eventname, setEventname] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [postImage, setPostImage] = useState({ img: "" })

    let navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if(eventname === '')
        {
            alert('Please enter event name');
            return
        }
        try {
            const newItem = { eventname, date,time,description, img: postImage };

            await fetch('http://localhost:5000/admin/createevent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            });
            alert('Event Post successfully!');

            navigate('/event');
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
                            <h3 className='mt-4' style={{ fontFamily: 'times-new-roman', fontStyle: 'italic' }}>Post New Event</h3>
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

                            <button type="submit" class="btn btn-primary mt-4">Submit</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostEvent


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

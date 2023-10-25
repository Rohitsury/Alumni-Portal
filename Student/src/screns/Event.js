import React, { useState, useEffect } from 'react'
import Navbar from '../Component/Navbar'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


function Event() {
    const [event, setEvent] = useState([])
    const [filterType, setFilterType] = useState('upcoming');  

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


    const filteredEvents = event.filter(eventItem => {
        const eventDate = new Date(eventItem.date);
        const currentDate = new Date();
        if (filterType === 'upcoming') {
            return eventDate >= currentDate;
        } else {
            return eventDate < currentDate;
        }
    });
    return (
        <>
            <Navbar />
            <section>
                <div className='mt-3'>
                    
                <button className={`btn mx-5 shadow ${filterType === 'upcoming' ? 'btn-warning' : 'btn-light'}`} onClick={() => setFilterType('upcoming')}>Upcoming</button>
                    <button className={`btn mx-5 shadow ${filterType === 'past' ? 'btn-warning' : 'btn-light'}`} onClick={() => setFilterType('past')}>Past</button>
                
                </div>
                <Carousel className='mt-5' showThumbs={false}>
                    {filteredEvents.map((eventItem, index) => (
                        <div key={index}>
                            <img src={eventItem.img} className='' style={{ width: '900px', height: '450px' }} alt={eventItem.eventname} />
                            <div className="d-flex justify-content-center  " >
                                <div className='w-50 h-25 inner text-white  ' style={{ marginTop: '-42vh' }} >
                                    <h1 className='fw-bold' style={{textTransform:'uppercase',letterSpacing:'2px'}} >{eventItem.eventname}</h1>
                                    <p>Date: <span className='fw-bold'>{formatDate(eventItem.date)}</span></p>
                                    <p>Time: <span className='fw-bold'>{eventItem.time}</span></p>
                                    <p className='text-warning'>{eventItem.description}  </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </section>

            <style>
                {`
                    .inner{
                        background:linear-gradient(to right,rgba(0,0,0,.7) 70%,rgba(255,255,255,.4));
                        padding:20px;
                    }
                `}
            </style>
        </>
    )
}

export default Event
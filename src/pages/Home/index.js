import React, { useEffect, useState } from 'react'

import Card from '../../components/Hotel/Cards/Card'
import Filter from '../../components/Hotel/Filter'
import { getHotels } from './index.handler'
const Home = () => {
    const [hotels, setHotels] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getHotels(setHotels, setLoading)
    }, [])

    return (
        <div className='container page-home '>
            <h1>Our Hotels</h1>
            <Filter setHotels={setHotels} />
            <div className="wrapper">
                {loading && <p>Loading</p>}
                {hotels && hotels.map((hotel, key) => (
                    <Card hotel={hotel} key={key} />
                ))}
            </div>
        </div>
    )
}

export default Home
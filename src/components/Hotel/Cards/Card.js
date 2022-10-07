import React from 'react'
import StarIcon from '../../../assets/icon/Star'

import style from './card.module.css'
const Card = (props) => {
    const { hotel } = props
    return (
        <div className={style.card}>
            <div className={style.image}>
                <img src={hotel.imageUrl} alt={hotel.name} />
                <span className={style.rating}>
                    {hotel.stars}/5 <span><StarIcon /></span></span>
            </div>
            <div className={style.content}>
                <div className={style.column}>
                    <p className={`${style.name} h3`}>{hotel.name || 'Hotel Alama'}</p>
                    <p className={style.location}>{hotel.location || 'Bali'}</p>
                </div>
                <div className={style.column}>
                    <p className={`${style.price} h2`}>Rp. {hotel.price.toString().replace(/(.{3})/, "$1,") || '1.000'}</p>
                </div>
            </div>
        </div>
    )
}

export default Card
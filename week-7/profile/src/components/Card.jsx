import React from 'react'
import './Card.css';

const Card = ({ card }) => {
    return (
        <div className='Card'>
            <div>
                <img className='backgroundImage' src={card.backgroundImage} alt='backgroundImage' />
            </div>
            <img className='profilePicture' src={card.profilePicture} alt='profilePicture' />
            <div className='details'>
                <h3>{card.name} <span>{card.age}</span></h3>
                <p>{card.address}</p>
            </div>
            <hr />
            <div className='stats'>
                <div><h3>{card.followers}</h3><p>Followers</p></div>
                <div><h3>{card.following}</h3><p>Following</p></div>
                <div><h3>{card.photos}</h3><p>Photos</p></div>
            </div>
        </div>
    )
}

export default Card

import React from 'react'
import Link from 'next/link'
import image1 from '../../../../../public/assets/pictures/mombasa.jpg'
import image2 from '../../../../../public/assets/pictures/nairobi.jpg'
import image3 from '../../../../../public/assets/pictures/voi.jpg'
import image4 from '../../../../../public/assets/pictures/naivasha.jpg'
import './Destinations.scss'
import Image from 'next/image'
import DestinationCard from './DestinationCard'

const Destinations = () => {
  return (
    <section className="destinations">
  <div className="container">
    <h2>Popular Destinations</h2>
    <p>Discover top travel spots served by our trains</p>

    <div className="destination-cards-container">
      <DestinationCard />
    </div>
  </div>
</section>

  )
}

export default Destinations
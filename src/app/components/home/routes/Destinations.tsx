import React from 'react'
import './Destinations.scss'
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
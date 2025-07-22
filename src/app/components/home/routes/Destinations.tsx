import React from 'react'
import Link from 'next/link'
import image1 from '../../../../../public/assets/pictures/mombasa.jpg'
import image2 from '../../../../../public/assets/pictures/nairobi.jpg'
import image3 from '../../../../../public/assets/pictures/voi.jpg'
import image4 from '../../../../../public/assets/pictures/naivasha.jpg'
import './Destinations.scss'
import Image from 'next/image'

const Destinations = () => {
  return (
    <section className="destinations">
  <div className="container">
    <h2>Popular Destinations</h2>
    <p>Discover top travel spots served by our trains</p>

    <div className="destination-cards">
      <div className="card">
        <Image src={image1} alt="Mombasa" />
        <h3>Mombasa</h3>
        <p>Relax by the ocean and explore rich Swahili culture.</p>
        <Link href="/booking">
          <button>Book Now</button>
        </Link>
      </div>

      <div className="card">
        <Image src={image2} alt="Nairobi" />
        <h3>Nairobi</h3>
        <p>Kenya’s capital hub—perfect for business and leisure.</p>
        <Link href="/booking">
          <button>Book Now</button>
        </Link>
      </div>
<div className="card">
        <Image src={image3} alt="Voi" />
        <h3>Voi</h3>
        <p>Scenic views and wildlife just a train ride away.</p>
        <Link href="/booking">
          <button>Book Now</button>
        </Link>
      </div>
      <div className="card">
        <Image src={image4} alt="Naivasha" />
        <h3>Naivasha</h3>
        <p>Scenic views and wildlife just a train ride away.</p>
        <Link href="/booking">
          <button>Book Now</button>
        </Link>
      </div>
    </div>
  </div>
</section>

  )
}

export default Destinations
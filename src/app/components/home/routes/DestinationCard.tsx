import React from "react";
import './Destinations.scss'
import Link from 'next/link'
import Image from 'next/image'
import { StaticImageData } from 'next/image';
import image1 from '../../../../../public/assets/pictures/mombasa.jpg'
import image2 from '../../../../../public/assets/pictures/nairobi.jpg'
import image3 from '../../../../../public/assets/pictures/voi.jpg'
import image4 from '../../../../../public/assets/pictures/naivasha.jpg'

type Destination = {
  image: StaticImageData;
  title: string;
  description: string;
};

const destinations = [
  {
    image: image1,
    title: "Mombasa",
    description: "Relax by the ocean and explore rich Swahili culture."
  },
  {
    image: image2,
    title: "Nairobi",
    description: "Experience the bustling capital and nearby national parks."
  },
  {
    image: image3,
    title: "Voi",
    description: "Gateway to Tsavo National Park and rich wildlife experiences."
  },
  {
    image: image4,
    title: "Naivasha",
    description: "Enjoy serene lakeside views and adventurous activities."
  }
];

const DestinationCard = () => {
  return (
    <div className="destination-cards">
      {destinations.map((destination:Destination, index:number) => (
        <div className="card" key={index}>
          <Image src={destination.image} alt={destination.title} />
          <h3>{destination.title}</h3>
          <p>{destination.description}</p>
          <Link href="/booking">
            <button>Book Now</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DestinationCard;
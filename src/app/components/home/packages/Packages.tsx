import React from "react";
import "./packages.scss";

const Packages = () => {
  return (
    <div className="packages-container">
      <div className="pricingTable">
        <h2 className="pricingTable-title">
          Find a plan that is right for you.
        </h2>
        <p className="pricingTable-subtitle">
          Every plan comes with a 7-day Cancellation Period.
        </p>

        <ul className="pricingTable-firstTable">
  <li className="pricingTable-firstTable_table">
    <h1 className="pricingTable-firstTable_table__header">
      Economy Class
    </h1>
    <p className="pricingTable-firstTable_table__pricing">
      <span>KSh</span>
      <span>1,200</span>
      <span>Per Trip</span>
    </p>
    <ul className="pricingTable-firstTable_table__options">
      <li>Standard Seating</li>
      <li>Free WiFi Access</li>
      <li>One Carry-on Bag</li>
      <li>Complimentary Water</li>
    </ul>
    <button className="pricingTable-firstTable_table__getstart">
      Book Now
    </button>
  </li>

  <li className="pricingTable-firstTable_table">
    <h1 className="pricingTable-firstTable_table__header">
      Business Class
    </h1>
    <p className="pricingTable-firstTable_table__pricing">
      <span>KSh</span>
      <span>2,500</span>
      <span>Per Trip</span>
    </p>
    <ul className="pricingTable-firstTable_table__options">
      <li>Premium Reclining Seats</li>
      <li>Free WiFi & Power Outlets</li>
      <li>Two Checked Bags</li>
      <li>Complimentary Meal & Drinks</li>
      <li>Priority Boarding</li>
      <li>Extra Legroom</li>
    </ul>
    <button className="pricingTable-firstTable_table__getstart">
      Book Now
    </button>
  </li>

  <li className="pricingTable-firstTable_table">
    <h1 className="pricingTable-firstTable_table__header">
      First Class
    </h1>
    <p className="pricingTable-firstTable_table__pricing">
      <span>KSh</span>
      <span>4,800</span>
      <span>Per Trip</span>
    </p>
    <ul className="pricingTable-firstTable_table__options">
      <li>Luxury Private Cabins</li>
      <li>Free WiFi Access</li>
      <li>Unlimited Checked Bags</li>
      <li>Gourmet Dining Service</li>
      <li>Priority Boarding & Lounge</li>
    </ul>
    <button className="pricingTable-firstTable_table__getstart">
      Book Now
    </button>
  </li>
</ul>
      </div>
    </div>
  );
};

export default Packages;

import React from 'react'
import '../styles/restaurant-card.scss';

export default function RestaurantCard({
  restaurant
}) {
  const { brand, variety, style, country, stars, topTen } = restaurant;
  return (
    <div className="restuarant-card-container">
      <div className="flex-start brand-container">
        <div className="heading">Brand:&nbsp;</div>
        <div className="brand info">
          <b>{brand}</b>
        </div>
      </div>
      <div className="flex-start variety-container">
        <div className="heading">Variety:&nbsp;</div>
        <div className="info">{variety}</div>
      </div>
      <div className="flex-start style-container">
        <div className="heading">Style:&nbsp;</div>
        <div className="info">{style}</div>
      </div>
      <div className="flex-start country-container">
        <div className="heading">Country:&nbsp;</div>
        <div className="info">{country}</div>
      </div>
      <div className="divider" />
      <div className="flex-space star-rank-container">
        <div className="flex-start">
          <div className="heading">Stars:&nbsp;</div>
          <div className="info">{stars}</div>
        </div>
        <div className="flex-start">
          <div className="heading">Rank:&nbsp;</div>
          <div className="info">{topTen}</div>
        </div>
      </div>
    </div>
  );
}

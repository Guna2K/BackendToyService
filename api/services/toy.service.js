// toyService.js
const fs = require('fs');

function loadToyData() {
  const toyData = fs.readFileSync('./data/toys.json', 'utf8');
  return JSON.parse(toyData);
}

function applyLocationSpecificLogic(location, toys) {
  if (location === 'US-NC') {
    toys.forEach((toy) => {
      toy.price = (toy.price / 80 + 0.08 * toy.price / 80).toFixed(3);
      toy.taxPercentage = 8;
      toy.price = parseFloat(toy.price);
    });
  } else if (location === 'IE') {
    toys.forEach((toy) => {
      toy.price = (1.23 * toy.price / 83.25).toFixed(3);
      toy.taxPercentage = 23;
      toy.price = parseFloat(toy.price);
    });
  } else if (location === 'IN') {
    toys.forEach((toy) => {
      toy.price = (toy.price + 0.18 * toy.price).toFixed(3);
      toy.taxPercentage = 18;
      toy.price = parseFloat(toy.price);
    });
  } else {
    throw new Error('Invalid Location provided!');
  }
}

function maxPriceFilter(toys, maxPrice) {
    return toys.filter((toy) => toy.price <= parseFloat(maxPrice));
  }
  
  function minPriceFilter(toys, minPrice) {
    return toys.filter((toy) => toy.price >= parseFloat(minPrice));
  }
  
  function ratingFilter(toys, rating) {
    return toys.filter((toy) => toy.rating >= parseFloat(rating));
  }
  
  function brandFilter(toys, brand) {
    return toys.filter((toy) => toy.brand === brand);
  }

module.exports = {
  loadToyData,
  applyLocationSpecificLogic,
  maxPriceFilter,
  minPriceFilter,
  ratingFilter,
  brandFilter,
};

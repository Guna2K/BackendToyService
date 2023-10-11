const { response } = require('express');
const fs = require('fs');
const toyService = require('../services/toy.service');


let toyData = fs.readFileSync("./data/toys.json");

 

const parsedToys = JSON.parse(toyData);

 

exports.getTeamDetails = (request, response) => {
    return response.status(200).json({
        team : "awaraBackend",
        memberNames : ["Adarsh Singh", "Guna M"]
    });
};

exports.getToyDetails = (request, response) => {
    const location = request.params.location;
    const maxPrice = request.query.maxprice || '';
    const minPrice = request.query.minprice || '';
    const rating = request.query.rating || '';
    const brand = request.query.brand || '';
  
    let toys = toyService.loadToyData();
  
    // Apply location-specific logic
    try {
      toyService.applyLocationSpecificLogic(location, toys);
    } catch (error) {
      return response.status(400).send();
    }
  
    // Filter the toys based on query parameters
    if (maxPrice !== '') {
      toys = toyService.maxPriceFilter(toys, maxPrice);
    }
    if (minPrice !== '') {
      toys = toyService.minPriceFilter(toys, minPrice);
    }
    if (rating !== '') {
      toys = toyService.ratingFilter(toys, rating);
    }
    if (brand !== '') {
      toys = toyService.brandFilter(toys, brand);
    }
  
    if (toys.length === 0) {
      return response.status(204).send(toys);
      }

      return response.status(200).send(toys);
    }
  
    



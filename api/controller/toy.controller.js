const { response } = require('express');
const fs = require('fs');

 

let toyData = fs.readFileSync("./data/toys.json");

 

const parsedToys = JSON.parse(toyData);

 

exports.getTeamDetails = (request, response) => {
    return response.status(200).json({
        team : "awaraBackend",
        memberNames : ["Adarsh Singh", "Guna M"]
    });
};

 

exports.getToyDetails = (request, response) => {
    let location = request.params.location;
    console.log(location)
    let maxPrice = request.query.maxprice || "";
    let minPrice = request.query.minprice || "";
    let rating = request.query.rating || "";
    let brand = request.query.brand || "";
    // console.log(maxPrice,minPrice,brand,rating);

 

    const filteredData = parsedToys;

 

    // Filter Functions
    const maxPriceFilter = (data, maxPrice) => data.filter(item => item.price<=parseFloat(maxPrice));
    const minPriceFilter = (data, minPrice) => data.filter(item => item.price>=parseFloat(minPrice));
    const ratingFilter = (data, rating) => data.filter(item => item.rating>=parseFloat(rating));
    const brandFilter = (data, brand) => data.filter(item => item.brand == brand);
    let toys = JSON.parse(JSON.stringify(parsedToys));


    if(location == "US-NC"){
        toys.forEach(toy => {
            toy.price = toy.price/80 + 0.08* toy.price/80;
            toy.price = toy.price.toFixed(3);
            toy.taxPercentage = 8;

        });
    }
    else if(location === "IE"){
        toys.forEach(toy => {
            toy.price = 1.23* toy.price/83.25;
            toy.price = toy.price.toFixed(3);
            toy.taxPercentage = 23;

        });
    }
    else if(location === "IN"){
        toys.forEach(toy => {
            toy.price = toy.price + 0.18* toy.price;
            toy.price = toy.price.toFixed(3);
            toy.taxPercentage = 18;
        });
    }
    else{
        return response.status(400).json({
            error:true,
            message : "Invalid Location provided!"
        })
    }

 

    if(maxPrice != ""){
        toys = maxPriceFilter(toys, maxPrice);
    }
    if(minPrice != ""){
        toys = minPriceFilter(toys, minPrice);
    }
    if(rating != ""){
        toys = ratingFilter(toys, rating);
    }
    if(brand != ""){
        toys = brandFilter(toys, brand);
    }

 

    if(toys.length == 0){
        return response.status(204).json({
            error:"No Content",
            message: "Fetch Successful",
            data: toys,
        });
    }

 

    return response.status(200).json({
        error:false,
        message: "Fetch Successful",
        data: toys,
    });
}

const chai = require('chai');
const toyService = require('../api/services/toy.service'); // Import your toyService module
const expect = chai.expect;

describe('ToyService Tests', () => {
  let toys = [];

  before(() => {
    // Load toy data before running the tests
    toys = toyService.loadToyData();
  });

  it('should apply location-specific logic for US-NC', () => {
    const location = 'US-NC';
    const originalToys = [...toys];

    toyService.applyLocationSpecificLogic(location, toys);

    // Add assertions based on your expected results
    // Example: assert the prices and tax percentages have been updated correctly
    expect(toys[0].price).to.equal(27);
    expect(toys[0].tax_percentage).to.equal(8);

    // Ensure that prices have been converted to float
    expect(toys[0].price).to.be.a('number');

    // You can perform similar assertions for other toy properties
  });

  // Write similar test cases for other location-specific logic

  it('should filter toys by max price', () => {
    const maxPrice = '50';
    const filteredToys = toyService.maxPriceFilter(toys, maxPrice);

    // Add assertions based on your expected results
    // Example: assert that all toy prices in filteredToys are less than or equal to 50
    const allPricesAreValid = filteredToys.every((toy) => toy.price <= parseFloat(maxPrice));
    expect(allPricesAreValid).to.be.true;
  });
  it('should filter toys by min price', () => {
    const minPrice = '100';
    const filteredToys = toyService.minPriceFilter(toys, minPrice);

    // Add assertions based on your expected results
    // Example: assert that all toy prices in filteredToys are less than or equal to 50
    const allPricesAreValid = filteredToys.every((toy) => toy.price >= parseFloat(minPrice));
    expect(allPricesAreValid).to.be.true;
  });
  it('should filter toys by rating', () => {
    const rating = '1';
    const filteredToys = toyService.ratingFilter(toys, rating);

    // Add assertions based on your expected results
    // Example: assert that all toy prices in filteredToys are less than or equal to 50
    const allRatingAreValid = filteredToys.every((toy) => toy.rating >= parseFloat(rating));
    expect(allRatingAreValid).to.be.true;
  });
  it('should filter toys by brand', () => {
    const brand = 'EnchantMe';
    const filteredToys = toyService.brandFilter(toys, brand);

    // Add assertions based on your expected results
    // Example: assert that all toy prices in filteredToys are less than or equal to 50
    const allBrandAreValid = filteredToys.every((toy) => toy.brand === brand);
    expect(allBrandAreValid).to.be.true;
  });

  // Write similar test cases for other filter functions (minPriceFilter, ratingFilter, brandFilter)
});

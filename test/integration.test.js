const { expect } = require('chai');
const sinon = require('sinon'); // for mocking
const toyController = require('../api/controller/toy.controller'); // adjust the path to your controller

describe('Toy Controller', () => {
  let response = {
    status: function (statusCode) {
      this.statusCode = statusCode;
      return this;
    },
    json: function (data) {
      this.body = data;
      return this;
    },
  };

  it('should return 400 for an invalid location', () => {
    const request = { params: { location: 'INVALID' },query: {}};
    toyController.getToyDetails(request, response);
    expect(response.statusCode).to.equal(400);
    expect(response.body.error).to.be.true;
  });

  it('should return 200 for an valid location', () => {
    const request = { params: { location: 'IN' },query: {}};
    toyController.getToyDetails(request, response);
    expect(response.statusCode).to.equal(200);
    expect(response.body.error).to.be.false;
  });

  it('should return 204 for no matching toys', () => {
    const request = { params: { location: 'US-NC' },  query: {brand: 'LEGO' } };
    toyController.getToyDetails(request, response);
    expect(response.statusCode).to.equal(204);
    expect(response.body.error).to.equal('No Content');
  });

  it('should return filtered toys for a valid max price filter', () => {
    const request = {
      params: { location: 'US-NC' },
      query: { maxprice: '100'},
    };
    toyController.getToyDetails(request, response);
    expect(response.statusCode).to.equal(200);
    expect(response.body.error).to.be.false;
    expect(response.body.message).to.equal('Fetch Successful');
  });

  it('should return filtered toys for a valid min price filter', () => {
    const request = {
      params: { location: 'US-NC' },
      query: { minprice: '1'},
    };
    toyController.getToyDetails(request, response);
    expect(response.statusCode).to.equal(200);
    expect(response.body.error).to.be.false;
    expect(response.body.message).to.equal('Fetch Successful');
  });

  it('should return filtered toys for a valid price filter', () => {
    const request = {
      params: { location: 'US-NC' },
      query: { minprice: '1', maxprice: '20'},
    };
    toyController.getToyDetails(request, response);
    expect(response.statusCode).to.equal(200);
    expect(response.body.error).to.be.false;
    expect(response.body.message).to.equal('Fetch Successful');
  });

  it('should return filtered toys for a valid brand filter', () => {
    const request = {
      params: { location: 'US-NC' },
      query: { brand : 'TechBuddies'},
    };
    toyController.getToyDetails(request, response);
    expect(response.statusCode).to.equal(200);
    expect(response.body.error).to.be.false;
    expect(response.body.message).to.equal('Fetch Successful');
  });


  it('should return filtered toys for a valid ratings filter', () => {
    const request = {
      params: { location: 'US-NC' },
      query: { rating: 4},
    };
    toyController.getToyDetails(request, response);
    expect(response.statusCode).to.equal(200);
    expect(response.body.error).to.be.false;
    expect(response.body.message).to.equal('Fetch Successful');
  });




});

const chai = require('chai');

const chaiHttp = require('chai-http');

const app = require('../app'); 

const expect = chai.expect;

 

chai.use(chaiHttp);

 
``
PORT = 3033

 

 

describe('Tests for endpoints', () => {

  it('should return toys for /toys/all/loc route!', (done) => {

    chai

      .request(app)

      .get('/toys/all/IN')

      .end((err, res) => {

        expect(res).to.have.status(200);

        expect(res.body.message).to.equal('Fetch Successful');

        done();

      });

  });


  it('should return bad request for invalid calls', (done) => {

    chai

      .request(app)

      .get('/toys/all/AUS')

      .end((err, res) => {

        expect(res).to.have.status(400);

        done();

      });

  });

 

  it('should return Success Response when /toys/team ', (done) => {

    const expectedResponse = {

      "team": "bike",

      "membersNames": [

          "Adarsh Singh",

          "Guna M"

      ]

  }

    chai

      .request(app)

      .get('/toys/team')

      .end((err, res) => {

        expect(res).to.have.status(200);

        expect(res.body.team).to.equal('awaraBackend');

        done();

      });

  });

 

//   it('should return Success Response when /classA/food/team ', (done) => {

//     chai

//       .request(app)

//       .get('/classA/food/team')

//       .end((err, res) => {

//         expect(res).to.have.status(200);

//         expect(res.body.team).to.equal('food');

//         expect(res.body.membersNames).to.have.lengthOf.above(0);

//         done();

//       });

//   });

 

//   it('should return Success Response when /classA/toys/team ', (done) => {

//     chai

//       .request(app)

//       .get('/classA/toys/team')

//       .end((err, res) => {

//         expect(res).to.have.status(200);

//         expect(res.body.team).to.equal('toys');

//         expect(res.body.membersNames).to.have.lengthOf.above(0);

//         done();

//       });

//   });

 

//   it('should return Invalid Service Name Response', (done) => {

//     chai

//       .request(app)

//       .get('/classA/invalidServiceName/team')

//       .end((err, res) => {

//         expect(res).to.have.status(400);

//         expect(res.body.error).to.equal( "Bad request: Service name does not exist!");

//         done();

//       });

//   });

 

 

//   xit('should return Axios Endpoint Down Response', (done) => {

//     chai

//       .request(app)

//       .get('/classA/error')

//       .end((err, res) => {

//         expect(res).to.have.status(500);

//         // expect(res.body.error).to.equal( "Unable to fetch data!");

//         // expect(res.body.message).to.equal("Request failed with status code 404")

//         done();

//       });

//   });

 

  

 

});
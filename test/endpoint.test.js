const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Import your Express app
const expect = chai.expect;

chai.use(chaiHttp);
const fs = require('fs');

// Util function
function loadToyData() {
  const toyData = fs.readFileSync('./data/toys.json', 'utf8');
  return JSON.parse(toyData);
}
describe('Controller Tests', () => {
  it('should return team details with a 200 status code', (done) => {
    chai
      .request(app)
      .get('/toys/team')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          team: 'awaraBackend',
          memberNames: ['Adarsh Singh', 'Guna M'],
        });
        done();
      });
  });

  it('should return toy details with a 200 status code for a valid location', (done) => {
    chai
      .request(app)
      .get('/toys/all/IN')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).length(loadToyData().length);
        done();
      });
  });


  it('should return a 400 status code for an invalid location', (done) => {
    chai
      .request(app)
      .get('/toys/all/INV')
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
      done();
  });

  it('should return a status 204 with bad filter when there is no product after filtering', (done) => {
    chai
      .request(app)
      .get('/toys/all/IN?minprice=1000&maxprice=100')
      .end((err, res) => {
        expect(res).to.have.status(204);
      });
      done();
});

it('should return a status 200 with min and max filter', (done) => {
  chai
    .request(app)
    .get('/toys/all/IN?minprice=100&maxprice=1000')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).length(6);
    });
    done();
});
it('should return a status 200 with min and max filter', (done) => {
  chai
    .request(app)
    .get('/toys/all/IN?minprice=100&maxprice=1000')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).length(6);
    });
    done();
});
it('should return a status 204 with min, max, brand, rating filter', (done) => {
  chai
    .request(app)
    .get('/toys/all/IN?minprice=100&maxprice=1000&brand=EnchantMe&rating=1')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).length(1);
    });
    done();
});
})

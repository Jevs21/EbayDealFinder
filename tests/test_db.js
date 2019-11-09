// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const db = require('../db');

// Configure chai
chai.use(chaiHttp);
chai.should();

// Use a test database for testing
db.connect('testdatabase.db');

describe('Testing Database', () => {
  beforeEach(() => {
    db.run(`INSERT INTO item (name, uri, last_item, price_point, active) VALUES ("test", "https://google.ca/", 'Nike Shirt', '10.00', 1)`);
  });

  afterEach(() => {
    db.clear();
  });

  describe('getLastItem', () => {
    it('should get the name of the last item for a uri', (done) => {
        const uri = 'https://google.ca/';

        db.getLastItem(uri).then((res) => {
            res.last_item.should.equal('Nike Shirt');
            done();
        });
    });
  });
});

// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('..');
const db = require('../db');

const Item = require('../model/Item');

// Configure chai
chai.use(chaiHttp);
chai.should();

// Use a test database for testing
db.connect('testdatabase.db');

describe('Item.js', () => {
  describe('new Item()', () => {
    it('should create a new Item object', (done) => {
        const data = {
            title: 'Test Title',
            description: '<table border="0" cellpadding="8"><tr><td width="80px"><a href="https://www.ebay.ca/itm/Brand-New-Mens-Nike-SB-AOP-Quilted-T-shirt-Black/254415284163?hash=item3b3c5527c3:m:m2-kbeLWQ_eGQKxZpDOUPDQ"><img border="0" src="https://i.ebayimg.com/thumbs/images/m/m2-kbeLWQ_eGQKxZpDOUPDQ/s-l225.jpg"></a></td><td><div><span><strong><b>C $</b>20.00</strong></span></div><div>End Date: <span>08-Dec 15:51</span></div><div>Buy It Now for only: US <b>C $</b>32.88</div><a href="https://www.ebay.ca/itm/Brand-New-Mens-Nike-SB-AOP-Quilted-T-shirt-Black/254415284163?hash=item3b3c5527c3:m:m2-kbeLWQ_eGQKxZpDOUPDQ">Buy it now</a><span> | </span><a href="http://cgi1.ebay.ca/ws/eBayISAPI.dll?MfcISAPICommand=MakeTrack&item=254415284163&ssPageName=RSS:B:SHOP:US:104">Add to watch list</a></td></tr></table>',
            link: 'https://www.google.ca/',
            url: 'https://www.google.ca/',
            guid: {test: 'test'},
            pubDate: 'Fri, 08 Nov 2019 13:51:22 GMT-07:00',
            created: 1573246282000
        }

        const testItem = new Item(data);

        testItem.title.should.equal('Test Title');
        testItem.description.should.equal('<table border="0" cellpadding="8"><tr><td width="80px"><a href="https://www.ebay.ca/itm/Brand-New-Mens-Nike-SB-AOP-Quilted-T-shirt-Black/254415284163?hash=item3b3c5527c3:m:m2-kbeLWQ_eGQKxZpDOUPDQ"><img border="0" src="https://i.ebayimg.com/thumbs/images/m/m2-kbeLWQ_eGQKxZpDOUPDQ/s-l225.jpg"></a></td><td><div><span><strong><b>C $</b>20.00</strong></span></div><div>End Date: <span>08-Dec 15:51</span></div><div>Buy It Now for only: US <b>C $</b>32.88</div><a href="https://www.ebay.ca/itm/Brand-New-Mens-Nike-SB-AOP-Quilted-T-shirt-Black/254415284163?hash=item3b3c5527c3:m:m2-kbeLWQ_eGQKxZpDOUPDQ">Buy it now</a><span> | </span><a href="http://cgi1.ebay.ca/ws/eBayISAPI.dll?MfcISAPICommand=MakeTrack&item=254415284163&ssPageName=RSS:B:SHOP:US:104">Add to watch list</a></td></tr></table>');
        testItem.link.should.equal('https://www.google.ca/');
        testItem.url.should.equal('https://www.google.ca/');
        testItem.pubDate.should.equal('Fri, 08 Nov 2019 13:51:22 GMT-07:00');
        testItem.created.should.equal(1573246282000);

        done();
    });
  });

  describe('Item.getCost()', () => {
    it('should extract the cost from the description', (done) => {
      const data = {
          title: 'Test Title',
          description: '<table border="0" cellpadding="8"><tr><td width="80px"><a href="https://www.ebay.ca/itm/Brand-New-Mens-Nike-SB-AOP-Quilted-T-shirt-Black/254415284163?hash=item3b3c5527c3:m:m2-kbeLWQ_eGQKxZpDOUPDQ"><img border="0" src="https://i.ebayimg.com/thumbs/images/m/m2-kbeLWQ_eGQKxZpDOUPDQ/s-l225.jpg"></a></td><td><div><span><strong><b>C $</b>20.00</strong></span></div><div>End Date: <span>08-Dec 15:51</span></div><div>Buy It Now for only: US <b>C $</b>32.88</div><a href="https://www.ebay.ca/itm/Brand-New-Mens-Nike-SB-AOP-Quilted-T-shirt-Black/254415284163?hash=item3b3c5527c3:m:m2-kbeLWQ_eGQKxZpDOUPDQ">Buy it now</a><span> | </span><a href="http://cgi1.ebay.ca/ws/eBayISAPI.dll?MfcISAPICommand=MakeTrack&item=254415284163&ssPageName=RSS:B:SHOP:US:104">Add to watch list</a></td></tr></table>',
          link: 'https://www.google.ca/',
          url: 'https://www.google.ca/',
          guid: {test: 'test'},
          pubDate: 'Fri, 08 Nov 2019 13:51:22 GMT-07:00',
          created: 1573246282000
      }

      const testItem = new Item(data);

      const cost = testItem.getCost();
      cost.should.equal('20.00');
      done();
    });
  });

  describe('Item.toString()', () => {
    it('should return a string representation of the item', (done) => {
      const data = {
          title: 'Test Title',
          description: '<table border="0" cellpadding="8"><tr><td width="80px"><a href="https://www.ebay.ca/itm/Brand-New-Mens-Nike-SB-AOP-Quilted-T-shirt-Black/254415284163?hash=item3b3c5527c3:m:m2-kbeLWQ_eGQKxZpDOUPDQ"><img border="0" src="https://i.ebayimg.com/thumbs/images/m/m2-kbeLWQ_eGQKxZpDOUPDQ/s-l225.jpg"></a></td><td><div><span><strong><b>C $</b>20.00</strong></span></div><div>End Date: <span>08-Dec 15:51</span></div><div>Buy It Now for only: US <b>C $</b>32.88</div><a href="https://www.ebay.ca/itm/Brand-New-Mens-Nike-SB-AOP-Quilted-T-shirt-Black/254415284163?hash=item3b3c5527c3:m:m2-kbeLWQ_eGQKxZpDOUPDQ">Buy it now</a><span> | </span><a href="http://cgi1.ebay.ca/ws/eBayISAPI.dll?MfcISAPICommand=MakeTrack&item=254415284163&ssPageName=RSS:B:SHOP:US:104">Add to watch list</a></td></tr></table>',
          link: 'https://www.google.ca/',
          url: 'https://www.google.ca/',
          guid: {test: 'test'},
          pubDate: 'Fri, 08 Nov 2019 13:51:22 GMT-07:00',
          created: 1573246282000
      }

      const expectedStr = `Test Title\nPublished: Fri, 08 Nov 2019 13:51:22 GMT-07:00\n<table border="0" cellpadding="8"><tr><td width="80px"><a href="https://www.ebay.ca/itm/Brand-New-Mens-Nike-SB-AOP-Quilted-T-shirt-Black/254415284163?hash=item3b3c5527c3:m:m2-kbeLWQ_eGQKxZpDOUPDQ"><img border="0" src="https://i.ebayimg.com/thumbs/images/m/m2-kbeLWQ_eGQKxZpDOUPDQ/s-l225.jpg"></a></td><td><div><span><strong><b>C $</b>20.00</strong></span></div><div>End Date: <span>08-Dec 15:51</span></div><div>Buy It Now for only: US <b>C $</b>32.88</div><a href="https://www.ebay.ca/itm/Brand-New-Mens-Nike-SB-AOP-Quilted-T-shirt-Black/254415284163?hash=item3b3c5527c3:m:m2-kbeLWQ_eGQKxZpDOUPDQ">Buy it now</a><span> | </span><a href="http://cgi1.ebay.ca/ws/eBayISAPI.dll?MfcISAPICommand=MakeTrack&item=254415284163&ssPageName=RSS:B:SHOP:US:104">Add to watch list</a></td></tr></table>\n`;

      const testItem = new Item(data);

      const str = testItem.toString();
      str.should.equal(expectedStr);
      done();
    });
  });
});

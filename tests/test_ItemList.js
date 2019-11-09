// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('..');
const db = require('../db');

const ItemList = require('../model/ItemList');

// Configure chai
chai.use(chaiHttp);
chai.should();

// Use a test database for testing
db.connect('testdatabase.db');

describe('ItemList.js', () => {
  describe('new ItemList()', () => {
    it('should create a new ItemList object', (done) => {
        const uri = 'http://google.ca/';
        const pricePoint = '20.00';
        const lastItem = '';

        const testItemList = new ItemList(uri, pricePoint, lastItem);

        testItemList.items.length.should.equal(0);
        testItemList.search_uri.should.equal(uri);
        testItemList.price_point.should.equal(pricePoint);
        testItemList.last_item.should.equal(lastItem);
        testItemList.length.should.equal(0);
        testItemList.items_searched.should.equal(0);

        done();
    });
  });

  describe('ItemList.loadItems()', () => {
    it('should load items from url into ItemList', (done) => {
        // Stub out Feed
        sinon.stub(ItemList, 'fetchFeed').callsFake(function fakeFn() {
            return [{
                title: 'Test Title',
                description: '<table border="0" cellpadding="8"><tr><td width="80px"><a href="https://www.ebay.ca/itm/Brand-New-Mens-Nike-SB-AOP-Quilted-T-shirt-Black/254415284163?hash=item3b3c5527c3:m:m2-kbeLWQ_eGQKxZpDOUPDQ"><img border="0" src="https://i.ebayimg.com/thumbs/images/m/m2-kbeLWQ_eGQKxZpDOUPDQ/s-l225.jpg"></a></td><td><div><span><strong><b>C $</b>20.00</strong></span></div><div>End Date: <span>08-Dec 15:51</span></div><div>Buy It Now for only: US <b>C $</b>32.88</div><a href="https://www.ebay.ca/itm/Brand-New-Mens-Nike-SB-AOP-Quilted-T-shirt-Black/254415284163?hash=item3b3c5527c3:m:m2-kbeLWQ_eGQKxZpDOUPDQ">Buy it now</a><span> | </span><a href="http://cgi1.ebay.ca/ws/eBayISAPI.dll?MfcISAPICommand=MakeTrack&item=254415284163&ssPageName=RSS:B:SHOP:US:104">Add to watch list</a></td></tr></table>',
                link: 'https://www.google.ca/',
                url: 'https://www.google.ca/',
                guid: {test: 'test'},
                pubDate: 'Fri, 08 Nov 2019 13:51:22 GMT-07:00',
                created: 1573246282000
            },
            {
                title: 'Test Title2',
                description: '<table border="0" cellpadding="8"><tr><td width="80px"><a href="https://www.ebay.ca/itm/Brand-New-Mens-Nike-SB-AOP-Quilted-T-shirt-Black/254415284163?hash=item3b3c5527c3:m:m2-kbeLWQ_eGQKxZpDOUPDQ"><img border="0" src="https://i.ebayimg.com/thumbs/images/m/m2-kbeLWQ_eGQKxZpDOUPDQ/s-l225.jpg"></a></td><td><div><span><strong><b>C $</b>200.00</strong></span></div><div>End Date: <span>08-Dec 15:51</span></div><div>Buy It Now for only: US <b>C $</b>32.88</div><a href="https://www.ebay.ca/itm/Brand-New-Mens-Nike-SB-AOP-Quilted-T-shirt-Black/254415284163?hash=item3b3c5527c3:m:m2-kbeLWQ_eGQKxZpDOUPDQ">Buy it now</a><span> | </span><a href="http://cgi1.ebay.ca/ws/eBayISAPI.dll?MfcISAPICommand=MakeTrack&item=254415284163&ssPageName=RSS:B:SHOP:US:104">Add to watch list</a></td></tr></table>',
                link: 'https://www.google.ca/',
                url: 'https://www.google.ca/',
                guid: {test: 'test'},
                pubDate: 'Fri, 08 Nov 2019 13:51:22 GMT-07:00',
                created: 1573246282000
            }];
        });

        const uri = 'http://google.ca/';
        const pricePoint = '30.00';
        const lastItem = '';

        const testItemList = new ItemList(uri, pricePoint, lastItem);
        testItemList.loadItems();

        testItemList.items.length.should.equal(1);
        testItemList.search_uri.should.equal(uri);
        testItemList.price_point.should.equal(pricePoint);
        testItemList.last_item.should.equal('Test Title');
        testItemList.length.should.equal(1);
        testItemList.items_searched.should.equal(2);

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

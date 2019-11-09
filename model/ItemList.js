const Feed = require('rss-to-json');
const db = require('../db');

const Item = require('../model/Item');

class ItemList {
    constructor(uri, pricePoint, lastItem) {
        this.items = [];
        this.search_uri = uri;
        this.price_point = pricePoint;
        this.last_item = lastItem;
        this.length = 0;
        this.items_searched = 0;
    }

    fetchFeed() {
        return new Promise((resolve, reject) => {
            Feed.load(this.search_uri, async (err, rss) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(rss);
                }
            });
        });
    }

    async loadItems() {
        let rss = await this.fetchFeed();

        if(rss.items.length > 0) {
            let new_last_item = escape(rss.items[0].title);
            for(let item of rss.items){
                if(escape(item.title) == escape(this.last_item)) {
                    break;
                }

                let i = new Item(item);
                if (parseFloat(i.getCost()) < parseFloat(this.price_point)) {
                    console.log(item);
                    this.items.push(i);
                    this.length += 1;
                }
                this.items_searched += 1;
            }
            await db.updateLastItem(this.search_uri, new_last_item);
        }
            
    }

    toString() {
        let str = '';
        for(let item of this.items) {
            str += `${item.toString()}\nPrice ${item.getCost()} is lower than the price point (${this.price_point})\n`;
        }
        return str;
    }
}

module.exports = ItemList;
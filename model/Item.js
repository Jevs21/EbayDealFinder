/**
 * Item
 */

class Item {
  constructor(data) {
    this.title = data.title;
    this.description = data.description;
    this.link = data.link;
    this.url = data.url;
    this.guid = data.guid;
    this.pubDate = data.pubDate;
    this.created = data.created;
  }

  getCost() {
    var mySubString = this.description.substring(
        this.description.lastIndexOf("<strong>") + 8, 
        this.description.lastIndexOf("</strong>")
    ).replace('<b>C $', '').replace('</b>', '');
    return mySubString;
  }

  /**
   * Returns a readable string
   */
  toString() {
      return `${this.title}\nPublished: ${this.pubDate}\n${this.description}\n`;
  }
}

module.exports = Item;
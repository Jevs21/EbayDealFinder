const express = require("express");
const app     = express();
const path    = require("path");

const db = require('./db');

const ItemList = require('./model/ItemList');
const Item = require('./model/Item');

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/static/index.html'));
});
  
// Send Script
app.get('/index.js', async (req,res) => {
    //Feel free to change the contents of style.css to prettify your Web app
    res.sendFile(path.join(__dirname+'/static/script/index.js'));
});
// Send Style
app.get('/style.css', async (req,res) => {
    //Feel free to change the contents of style.css to prettify your Web app
    res.sendFile(path.join(__dirname+'/static/style/style.css'));
});

app.get('/loadUriList', async (req, res) => {
    const uri_list = await db.getAllActiveUris();
    res.send(uri_list);
});

app.get('/addUri', async (req, res) => {
    await db.addNewUri(req.query.name, req.query.uri, req.query.price_point);
    res.send(true);
});

app.get('/deleteUri', async (req, res) => {
    await db.deleteUri(req.query.id);
    res.send(true);
});

app.get('/updatePricePoint', async (req, res) => {
    await db.updatePricePoint(req.query.id, req.query.price_point);
    res.send(true);
});

app.get('/findDeals', async (req, res) => {
    
    const uri_list = await db.getAllActiveUris();

    let resp = [];
    for(uri of uri_list) {
        console.log(uri);
        let cur_list = new ItemList(uri.uri, uri.price_point, uri.last_item);
        await cur_list.loadItems();
        resp.push({
            name: uri.name,
            items: cur_list.toString()
        });
    }
    res.send(resp);
});


app.listen(8000);
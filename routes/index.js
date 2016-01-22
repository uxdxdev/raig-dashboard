var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));

// Create
router.post('/api/v1/raig', function(request, response){
    var results = [];

    // Grab data from http request
    var data = {
        test : request.body.text,
        complete : false
    };

    // Get a postgres client from pool
    pg.connect(connectionString, function(err, client, done){

        // Handle errors
        if(err)
        {
            done();
            console.log(err);
            return response.status(500).json({
                success : false,
                data : err
            });
        }

        // SQL Insert data from the request
        client.query('INSERT INTO items(text, complete) values($1, $2)', [data.text, data.complete]);

        // SQL Select data in db
        var query = client.query('SELECT * FROM items ORDER BY id ASC');

        // Add each row in the db to the results Array
        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            done();
            return response.json(results);
        });

    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

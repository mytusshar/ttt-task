/***
 * author: Tushar Bochare
 * Email: mytusshar@gmail.com
 */

var express = require('express');
var request = require('request');
var cors = require('cors');
var app = express();
 
app.use(cors());
app.get("/", function(req, res) {
    res.json({"Status": "server runnning successfully"});
});

app.get("/frequentWords", function(req, res) {
    var number = req.query.number;
    readFile(req, res);

    console.log(number);
    // console.log(data);
    res.json({"result": data});
});


function readFile(req, res) {
    request.get('http://terriblytinytales.com/test.txt', function (err, res, body) {
        if (!err && res.statusCode == 200) {
            var arrayData = body.replace(/[^a-zA-Z ]/g, " ");
            arrayData = arrayData.replace("\n", " ");
            arrayData = arrayData.split(" ");
            
            arrayData = arrayData.filter(function(str) {
                return /\S/.test(str);
            });
            console.log(arrayData);
            // return arrayData;
            findFrequentWords(arrayData);
        }
    });
}

function findFrequentWords() {
    
}



app.set('port', 8081);
var server = app.listen(app.get('port'), terminalMSG);

function terminalMSG() {
    console.log('Express server listening on port ' + server.address().port);
}


/***
 * author: Tushar Bochare
 * Email: mytusshar@gmail.com
 */

var express = require('express');
var request = require('request');
var cors = require('cors');
var app = express();
 
const NUMBER_WITHIN_LIMIT = 1;
const NUBMER_OUTOF_LIMIT = 0;
var arrayData;

app.use(cors());

request.get('http://terriblytinytales.com/test.txt', function (err, response, body) {
    if (!err && response.statusCode == 200) {
        arrayData = body.replace(/[^a-zA-Z ]/g, " ");
        arrayData = arrayData.replace("\n", " ");
        arrayData = arrayData.split(" ");
        arrayData = arrayData.filter(function(str) {
            return /\S/.test(str);
        });
    }
});

app.get("/", function(req, res) {
    res.json({"Status": "server runnning successfully"});
});

app.get("/frequentWords", function(req, res) {
    findFrequentWords(arrayData, req, res);
});

function findFrequentWords(arrayData, req, res) {
    var wordsMap = createWordMap(arrayData);
    var finalWordsArray = sortByCount(wordsMap);
    var number = req.query.number;

    var result = {};
    result.number = number;

    if(number > finalWordsArray.length) {
        result = {"name": "Input number exceeds the value of unique words in the file", "total": finalWordsArray.length};
        result.status = NUBMER_OUTOF_LIMIT;
    } else {
        for(var i=0; i<number; i++) {
            result[i] = finalWordsArray[i];
        }
        result.status = NUMBER_WITHIN_LIMIT;
    }
    res.json({output: result});
}

function createWordMap (wordsArray) {
    var wordsMap = {};
    wordsArray.forEach(function (key) {
        if (wordsMap.hasOwnProperty(key)) {
            wordsMap[key]++;
        } else {
            wordsMap[key] = 1;
        }
    });
    return wordsMap;
}


function sortByCount (wordsMap) {
    var finalWordsArray = [];
    finalWordsArray = Object.keys(wordsMap).map(function(key) {
        return {
            name: key,
            total: wordsMap[key]
        };
    });
    finalWordsArray.sort(function(a, b) {
        return b.total - a.total;
    });
    return finalWordsArray;
}


app.set('port', 8081);
var server = app.listen(app.get('port'), terminalMSG);

function terminalMSG() {
    console.log('Express server listening on port ' + server.address().port);
}


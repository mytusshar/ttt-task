var request = require('request');

request.get('http://terriblytinytales.com/test.txt', function (err, res, body) {
    if (!err && res.statusCode == 200) {
        var arrayData = body.replace(/[^a-zA-Z ]/g, " ");
        arrayData = arrayData.replace("\n", " ");
        arrayData = arrayData.split(" ");
        
        arrayData = arrayData.filter(function(str) {
            return /\S/.test(str);
        });
        // console.log(arrayData);

        var wordsMap = createWordMap(arrayData);
        var finalWordsArray = sortByCount(wordsMap);
    
        console.log(finalWordsArray);
        console.log('The word "' + finalWordsArray[0].name + '" appears the most in the file ' +
            finalWordsArray[0].total + ' times');
    }
});


function splitByWords (text) {
    // split string by spaces (including spaces, tabs, and newlines)
    var wordsArray = text.split(/\s+/);
    return wordsArray;
}



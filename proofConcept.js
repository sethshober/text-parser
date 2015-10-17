var fs = require('fs') 
  //, str         = "Hi, how are you? I am fine. \r How are you? \nI am ok.\r\nHow are you?"

function parseText(data) {

  function normalizeText(text) {
    text = text.replace(punctuation, "")
    text = text.replace(lineEndings, " ")
    return text
  }

  function getWords(text){
    text = text.split(" ")
    return text
  }

  function removeEmptyValues(arr) {
    // of iterates over values
    for (var i of arr) i && temp.push(i); // copy each non-empty value to the 'temp' array
    arr = temp;
    delete temp; // discard the variable
    return arr
  }

  // some issues with correct counts. need to remove commas
  // missing beginning of string. Hi, is gone??
  function sequencer(index) {
    sequence = (words[i] + " " + words[i + 1] + " " + words[i + 2]).toLowerCase()
    wordTable[sequence] ? wordTable[sequence] ++ : wordTable[sequence] = 1
  }

  function sortTable(table) {
    var wordTableSort = []
    for ( var key in table ) { // loop through sentenceMap keys and push the val (count) to sentenceMapVals array
      wordTableSort.push( [key, table[key]] ); // push key:val
    }
    wordTableSort.sort( function(a,b) { return b[1] - a[1]; });
    for ( var i = 0; i < 100 && wordTableSort[i]; i++ ) { // log in desired format up to 100 top three word sentences
        console.log( wordTableSort[i][1] + " - " + wordTableSort[i][0] );
    }
  }

  var punctuation = /(\?|\!|\.|\,|\;|\:|\_|\"|\'|\,|\[|\]|\{|\}|\(|\)|\.\.\.)/gm
    , lineEndings = /(\r\n|\n|\r|\s\s)/gm
    , words
    , wordTable = {}
    , sequence
    , temp = []
    , i = 0

  data = normalizeText(data)
  words = getWords(data)
  words = removeEmptyValues(words)
  while (i < words.length) {
    sequencer(i)
    i++
  }
  sortTable(wordTable)
}

module.exports = function readFile(file) {
  fs.readFile(file, {encoding: 'utf8'}, function(err, data){
    if (err) throw err
    parseText(data)
  })
}






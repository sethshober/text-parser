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

  // fun ES6 way to remove empty values from array
  function removeEmptyValues(arr) {
    var temp = []
    // of iterates over values
    // copy each non-empty value to the 'temp' array
    for (var i of arr) i && temp.push(i) 
    arr = temp
    delete temp // discard the variable
    return arr
  }

  // some issues with correct counts. need to remove commas
  // missing beginning of string. Hi, is gone??
  function sequencer(index) {
    var sequence = (words[i] + " " + words[i + 1] + " " + words[i + 2]).toLowerCase()
    wordTable[sequence] ? wordTable[sequence] ++ : wordTable[sequence] = 1
  }

  function sortTable(table) {
    var wordTableSort = []
    for ( var key in table ) { // loop through map keys
      wordTableSort.push( [key, table[key]] ); // push key:val
    }
    // sort by high/low
    wordTableSort.sort( function(a,b) { return b[1] - a[1]; })
    return wordTableSort
  }

  function logSequences(table) {
    for ( var i = 0; i < 100 && table[i]; i++ ) { // limit 100
      console.log( table[i][1] + " - " + table[i][0] )
    }
  }


  var punctuation = /(\?|\!|\.|\,|\;|\:|\_|\"|\'|\,|\[|\]|\{|\}|\(|\)|\.\.\.)/gm
    , lineEndings = /(\r\n|\n|\r|\s\s)/gm
    , words
    , wordTable = {}
    , sequences
    , i = 0

  data = normalizeText(data)
  words = getWords(data)
  words = removeEmptyValues(words)
  while (i < words.length) {
    sequencer(i)
    i++
  }
  sequences = sortTable(wordTable)
  logSequences(sequences)
}

module.exports = function readFile(file) {
  fs.readFile(file, {encoding: 'utf8'}, function(err, data){
    if (err) throw err
    parseText(data)
  })
}






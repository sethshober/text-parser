var fs          = require('fs') 
  , punctuation = /(\?|\!|\.|\,|\;|\:|\_|\"|\'|\,|\[|\]|\{|\}|\(|\)|\.\.\.)/gm
  , lineEndings = /(\r\n|\n|\r|\s\s)/gm
  , words
  , wordTable   = {}
 // , str       = "Hi, how are you? I am fine. \r How are you? \nI am ok.\r\nHow are you?" // for testing

/**
 * Removes punctuation and line endings from text.
 * @param {string} text - The data returned from a text file.
 * @return {string} The normalized text.
 */
function normalizeText(text) {
    text = text.replace(punctuation, "")
    text = text.replace(lineEndings, " ")
    return text
  }

/**
 * Splits string on spaces to create array of words.
 * @param {string} text - normalized text
 * @return {array} The words from the text.
 */
function getWords(text){
  text = text.split(" ")
  return text
}

/**
 * Fun ES6 way to remove empty values from array
 * @param {array} arr - our words array
 * @return {array} The words array with empty space values removed.
 */
function removeEmptyValues(arr) {
  var temp = []
  // of iterates over values
  // copy each non-empty value to the 'temp' array
  for (var i of arr) i && temp.push(i) 
  arr = temp
  return arr
}

/**
 * Creates a hash table for three word sequences with count.
 * @param {number} index - index number for iteration
 */
function sequencer(index) {
  // some issues with correct counts. need to remove commas
  // missing beginning of string. Hi, is gone??
  var sequence = (words[index] + " " + words[index + 1] + " " + words[index + 2]).toLowerCase()
  // if sequence exists in table add one to count, else add to table
  wordTable[sequence] ? wordTable[sequence] ++ : wordTable[sequence] = 1
}

/**
 * Sorts our words in descending order
 * @param {object} table - our word sequence hash table
 * @return {array} Three word sequences in desc order
 */
function sortTable(table) {
  var wordTableSort = []
  for ( var key in table ) { // loop through map keys
    wordTableSort.push( [key, table[key]] ); // push key:val
  }
  wordTableSort.sort( function(a,b) { return b[1] - a[1]; }) // high/low
  return wordTableSort
}

/**
 * Logs our three word sequences
 * @param {array} table - index number for iteration
 * @param {number} [limit] - how many items to log
 */
function logSequences(wordArr, limit) {
  if (!limit) limit = wordArr.length
  for (var i = 0; i < limit && wordArr[i]; i++) {
    console.log( wordArr[i][1] + " - " + wordArr[i][0] )
  }
}

/**
 * Parses text from a file to show the top three word sequences.
 * Ignores line endings and punctuation.
 * @param {string} data - text from file
 */
function parseText(data) {
  var sequences
  data = normalizeText(data)
  words = getWords(data)
  words = removeEmptyValues(words)
  for (var i = 0; i < words.length; i++) sequencer(i)
  sequences = sortTable(wordTable)
  logSequences(sequences, 100)
}

// would probably be more efficient to process each chunk as it comes
module.exports = function readFile(file) {
  var text = ""
    , file = fs.createReadStream(file, { encoding: 'utf8', autoClose: true })
  // error check
  file.on('error', function(err) { throw err })
  // build text
  file.on('data', function(data) { text += data })
  // do parsing
  file.on('end', function() { parseText(text) })
}






// Problem: We need to output the top 100 three word sentences along with a count of times occurred, from files given.
	// It ignores punctuation, line endings, and is case insensitive.
	// It should be capable of processing large files and run fast.
// Solution: We will use node because it excels at fast I/O.
	// We can utilize streams, and pass file path in via process.argv
	// We will split the buffer into sentences, and then determine which ones are three words.
	// Now we can 'sanitize' our remaining sentences. ( remove punctuation and line returns and coerce to lower case )
	// Now that we have valid sentences we can add them to a hash table, setting the value to 1. If we have a match we add one to the value.
	// We now have a count of all three word sentences and do a sort and display to the output.

var   fs                        = require('fs') // for interacting with file system
	, files                     = process.argv.slice(2, process.argv.length) // array of files passed in via command line
	, fileCount                 = 1 // counter stream loop in readFiles
	, threeWordSentences        = [] // for testing comparison of sentenceMap values
	, sentenceMap               = {} // mapping sentences to count
	, punctuation               = /(\?|\!|\.|\,|\;|\:|\_|\"|\'|\,|\[|\]|\{|\}|\(|\)|\.\.\.)/gm // the things we don't want (punctuation and line breaks). there are 14 types of punctuation in the English language btw. kept hyphens |\-|\–| because a hyphenated word is one word.
	, lineEndings               = /(\r\n|\n|\r)/gm
	, droppedSentence           = ""; // store dropped sentence from data chunk


/**
 * opens a read stream for each file from process.argv.
 */
function readFiles() {

	var file = fs.createReadStream(files[fileCount -1], { encoding: 'utf8', autoClose: true }); // open stream to read our file

	// if error on read, print to console
	file.on('error', function(error) { throw error; });

	// on data chunk split into sentences, check if three words, sanitize remainder, add to hash
	file.on('data', function(chunk) {
		var   sentence
		    , sentences
		    , validSentence;

		chunk = droppedSentence + chunk; // prepend data chunk with droppedSentence item
		sentences = chunk.split(/(\.|\!|\?)\s/); // split on sentence ends of ./?/! plus space to find sentences. I'm sure there are edge cases to this.
		droppedSentence = sentences.pop(); // since inevitably we will end in the middle of a sentence, drop that and save it to be prepended to the next chunk.
		
		for ( var i = 0; i < sentences.length; i++ ) { // check each sentence
			sentence = sentences[i].replace(lineEndings, " ").replace(/\s\s/, "").trim(); // replace line endings with a space to avoid joining two words together. remove double spaces which was causing two words with two spaces in between to count as a sentence. remove extra white space.
			if ( sentence.split(" ").length === 3 ) { // if sentence is three words
				validSentence = sentence.replace(punctuation,"").toLowerCase(); // remove what we don't want and make it lower case, since we are case insensitve
				threeWordSentences.push(validSentence); // push to array our acceptable three word sentence
				sentenceMap[validSentence] ? sentenceMap[validSentence] ++ : sentenceMap[validSentence] = 1; // add our valid sentence to our sentence hash table, setting the value to 1. If we have a match don't add to table, but add one to the existing value.
			}
		}
	});

	// on data end print result if last file, else readFiles again
	file.on('end', function() {
		var sentenceMapSort;
		if ( fileCount === files.length ) { // if we've run through all our files...
			sentenceMapSort = []; // count vals from sentenceMap
			for ( var key in sentenceMap ) { // loop through sentenceMap keys and push the val (count) to sentenceMapVals array
				sentenceMapSort.push( [key, sentenceMap[key]] ); // push key:val
			}
			sentenceMapSort.sort( function(a,b){ return b[1] - a[1]; } ); // sort count in descending order (highest first)
			for ( var i = 0; i < 100 && sentenceMapSort[i]; i++ ) { // log in desired format up to 100 top three word sentences
				console.log( sentenceMapSort[i][1] + " - " + sentenceMapSort[i][0] );
			}
		} else { fileCount ++; readFiles(); } // if more files readFiles again on next file
	});
}


module.exports.readFiles = readFiles;



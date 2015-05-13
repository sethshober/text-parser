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
	, file                      = process.argv[2] // file path passed in via command line
	, readStream                = fs.createReadStream(file, { encoding: 'utf8', autoClose: true }) // open stream to read our file
	, threeWordSentences        = [] // for testing comparison of sentenceMap values
	, sentenceMap               = {} // mapping sentences to count
	, punctuationAndLineReturns = /(\r\n|\n|\r|\?|\!|\.|\,|\;|\:|\-|\–|\_|\"|\'|\,|\[|\]|\{|\}|\(|\)|\.\.\.)/gm // the things we don't want (punctuation and line breaks). there are 14 types of punctuation in the English language btw.
	, droppedSentence           = "";

// if error on read, print to console
readStream.on('error', function(error) {
	console.log(error);
})

// on data chunk split into sentences, check if three words, sanitize remainder, add to hash
readStream.on('data', function(chunk) {
	var   sentences, validSentence;
	chunk = droppedSentence + chunk; // prepend data chunk with droppedSentence item
	sentences = chunk.split(/(\.|\!|\?)\s/); // split on sentence ends of ./?/! plus space to find sentences. I'm sure there are edge cases to this.
	droppedSentence = sentences.pop(); // since inevitably we will end in the middle of a sentence, drop that and save it to be prepended to the next chunk.
	for ( var i = 0; i < sentences.length; i++ ) { // for each sentence check if word count is 3
		if ( sentences[i].split(" ").length === 3 ) {
			validSentence = sentences[i].replace(punctuationAndLineReturns,"").toLowerCase(); // remove what we don't want and make it lower case, since we are case insensitve
			threeWordSentences.push(validSentence); // push to array our acceptable three word sentence
			sentenceMap[validSentence] ? sentenceMap[validSentence] ++ : sentenceMap[validSentence] = 1; // add our valid sentence to our sentence hash table, setting the value to 1. If we have a match don't add to table, but add one to the existing value.
		}
	}
})

// on data end print result
readStream.on('end', function() {
	console.log(threeWordSentences);
	console.log(sentenceMap);
})






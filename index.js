// Problem: We need to output the top 100 three word sentences along with a count of times occurred, from files given.
	// It ignores punctuation, line endings, and is case insensitive.
	// It should be capable of processing large files and run fast.
// Solution: We will use node because it excels at fast I/O.
	// We can utilize streams, and pass file path in via process.argv
	// We will split the buffer into sentences, and then determine which ones are three words.
	// Now we can 'sanitize' our remaining sentences. ( remove punctuation and line returns and coerce to lower case )
	// Now that we have valid sentences we can add them to a hash table, setting the value to 1. If we have a match we add one to the value.
	// We now have a count of all three word sentences and do a sort and display to the output.


var   fs    = require('fs') // for interacting with file system
	, file  = process.argv[2]; // file path passed in via command line

// read file and print to console.
// readFile will store entire file in memory before doing anything with it
// this is blocking and slow. AIN'T NOBODY GOT TIME FOR THAT!!
// this will be switched to createReadStream so it will be much faster and more efficient
// need to get readFile working first, since streams introduce further problems (ex. end of stream cutting a sentence in half. will most likely drop the last item in stream and append it to next stream.)
fs.readFile(file, 'utf8', function(err, data) {
	var   sentences
		, threeWordSentences
		, punctuationAndLineReturns
		, validSentence
		, sentenceMap
		, i;
	
	if (err) { throw err; }
	// console.log(file);
	sentences = data.split(/(\.|\!|\?)\s/); // split on sentence ends of ./?/! plus space to find sentences. I'm sure there are edge cases to this.
	threeWordSentences = []; // for testing comparison of sentenceMap values
	sentenceMap = {}; // mapping sentences to count
	punctuationAndLineReturns = /(\r\n|\n|\r|\?|\!|\.|\,|\;|\:|\-|\–|\_|\"|\'|\,|\[|\]|\{|\}|\(|\)|\.\.\.)/gm; // the things we don't want (punctuation and line breaks). there are 14 types of punctuation in the English language btw.
	for ( i = 0; i < sentences.length; i++ ) {
		if ( sentences[i].split(" ").length === 3 ) { // for each sentence check if word count is 3
			validSentence = sentences[i].replace(punctuationAndLineReturns,"").toLowerCase(); // remove what we don't want and make it lower case, since we are case insensitve
			threeWordSentences.push(validSentence); // push to array our acceptable three word sentence
			sentenceMap[validSentence] ? sentenceMap[validSentence] ++ : sentenceMap[validSentence] = 1; // add our valid sentence to our sentence hash table, setting the value to 1. If we have a match don't add to table, but add one to the existing value.
		}
	}
	console.log(threeWordSentences);
	console.log(sentenceMap);
});






# text-parser

Command line utility to take in flat files and print out the top 100 three word sentences with count, ignoring punctuation, line endings, and being case insensitive.

Current support is for flat `.txt` files only.

Usage: `node index.js [file1] [file2]`

There is an optional `-r` flag that accepts a single folder and reads the files recursively one level deep.

Usage: `node index.js -r [folder]

Example Printout:

5 - i like cheeseburgers

4 - i run trails

1 - do the javascript

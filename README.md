# sethshober-coding-challenge
New Relic Coding Challenge

Command line utility to take in flat files and print out the top 100 three word sentences with count, ignoring punctuation, line endings, and being case insensitive.

Current support is for flat files only.

Usage: `node index.js [file1] [file2]`

There is an optional `-r` flag that takes in a single folder and reads the files recursively.

Usage: `node index.js -r [folder]

Example Printout:

5 - i like cheeseburgers

4 - i run trails

1 - do the javascript
# Trie Data Structure
NPM package: [@krushaybhavsar/triedatastructure](https://www.npmjs.com/package/@krushaybhavsar/triedatastructure)

## Installation Instructions
**Please be sure to have Node.js and NPM installed on your system prior to following these instructions**
1. Open your system's command-line interpreter (Command Prompt for Windows)
2. Install the modules needed to run the data structure by entering the following lines:
```
npm install prompt-sync
```
```
npm install node-fetch
```
3. Install the node package by entering the following command:
```
npx @krushaybhavsar/triedatastructure
```
4. At this point you the CLI (command-line interface) of the NPM package should begin running on your system.

## CLI Usage Instructions
Upon runnng the CLI, your command-line interpreter should look something like this:
```
Welcome to the Trie CLI!
You can enter 'quit' anytime to exit the program.

Enter 'load trie' to load the trie >>>
```
Enter "load trie" so that the program can send a GET request to retrieve data from a Firebase database.
```
Enter 'load trie' to load the trie >>> load trie
[ 'apple', 'car', 'ape', 'app' ]
Trie successfully loaded!

Now that you have loaded the trie, you can perform operations by typing in valid commands.
Enter 'help' to view a full list of valid commands.

Enter a command >>>
```
The program should now allow you to perfrom operations on the trie. To view all operations that can be performed on the trie, enter `help`.
```
Enter a command >>> help
Valid commands are:
'insert' --> inserts keyword into trie
'delete' --> deletes keyword from trie
'search' --> checks if keyword is in trie
'autocomplete' --> gives list of autocomplete suggestions based on given keyword prefix (suggests partial words)
'autocomplete full' --> gives list of autocomplete suggestions based on given keyword prefix (suggests full words)
'display' --> lists all words present in trie
'quit' --> terminates program

Enter a command >>>
```
Anytime you are not in the middle of performing an operation, you have the option to enter `quit`, which will terminate the program.<br/>
To perfrom operations on the trie, first enter the name of the operation you would like to perform. Then, follow through with what the CLI asks to execute the operation.<br/>
The snippet below shows an example of how you could insert a keyword into the trie:
```
Enter a command >>> insert
Enter a word to insert into the trie >>> coding
Updating data in database...
Word successfully inserted!

Enter a command >>>
```
Once an operation has been executed successfully, the CLI will prompt you to enter a command once again. During this time, you have the opportunity to display the words that are currently in the trie:
```
Enter a command >>> display
[ 'ape', 'app', 'apple', 'car', 'coding' ]
ape
app
apple
car
coding

Enter a command >>>
```
If you are confused on what a certain operation does, you can enter `help` to view a brief description on the operation's purpose.

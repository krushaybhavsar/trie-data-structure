# How it works

## Loading  and Modifying Trie Data
#### Initally Loading the Trie
The project contains an `index.js` file which sets up two Firebase functions. Using these functions and an API route (currently set up at https://us-central1-triedatastructure-eebc0.cloudfunctions.net/trie/words), it is possible to perform a multitude of REST API requests to and from the Friebase database. To load the data, the program simply performs a GET request that returns a JSON. Below is an example of what could be received:
```
{
  "id" : "words",
  "wordList" : ["ape","app","apple","car","coding"]
}
```
The `wordList` property is an array of words that are saved into the trie. During the initialization process of loading the trie, the program traverses through the recieved array and inserts each word into the client's empty trie instance. This way, the client's trie data aligns with the global state.

#### Modifying the Trie During Operation Execution
When a user performs a trie operation, the program first modifies the client instance of the trie. Once that has been successfull, a function to update the trie's list of words is called. Once everything locally has been updated, the program sends a PUT request directed at the API route. This PUT request sends an array in JSON format to the database telling it to change the global state's data to whatever the data in that client instance is. The data sent through the PUT request may look something like this:
```
{
   "wordList" : ["ape","app","apple","car"]
}
```

## Testing the API Routes using CURL
It is possible to modify or view the global state's data directly by sending a GET or PUT request to the following API route:<br/>
https://us-central1-triedatastructure-eebc0.cloudfunctions.net/trie/words</br></br>

Below is an a guide on how to receive the data in the current global trie state:
1. Open your command-line interpreter and enter the following command:
  ```
  curl https://us-central1-triedatastructure-eebc0.cloudfunctions.net/trie/words
  ```
2. After entering the command above, your command-line interpreter should output something similar to what is shown below:
  ```
  {"id":"words","wordList":["ape","app","apple","car","coding"]}
  ```
If you would like to sned a PUT request using CURL, you can use the same API route. Be sure to format the body JSON similar to the following:
```
{
   "wordList" : ["firstWord","secondWord","thirdWord"]
}
```

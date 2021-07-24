var Trie = require("./DataStructure/Trie.js");
const fetch = require("node-fetch");
const prompt = require("prompt-sync")();
var t = undefined;

const startCLI = async () => {
  console.log();
  var response = prompt("Enter 'load trie' to load the trie >>> ");
  if (response === "load trie") {
    t = new Trie();
    await get(
      "https://us-central1-triedatastructure-eebc0.cloudfunctions.net/trie/words"
    )
      .then((data) => {
        console.log(data["wordList"]);
        for (var i = 0; i < data["wordList"].length; i++) {
          t.insertKeyword(data["wordList"][i]);
        }
      })
      .catch((err) =>
        console.log("An error occured while loading data from database...")
      );
    console.log("Trie successfully loaded!\n");
    console.log(
      "Now that you have loaded the trie, you can perform operations by typing in valid commands.\nEnter 'help' to view a full list of valid commands."
    );
    performOperations();
  } else if (response === "quit") {
    process.exit();
  } else {
    console.log("Invalid input. Please try again.");
    startCLI();
  }
};

const performOperations = async () => {
  console.log("");

  var response = prompt("Enter a command >>> ");
  if (response === "help") {
    console.log("Valid commands are:");
    console.log("'insert' --> inserts keyword into trie");
    console.log("'delete' --> deletes keyword from trie");
    console.log("'search' --> checks if keyword is in trie");
    console.log(
      "'autocomplete' --> gives list of autocomplete suggestions based on given keyword prefix (suggests partial words)"
    );
    console.log(
      "'autocomplete full' --> gives list of autocomplete suggestions based on given keyword prefix (suggests full words)"
    );
    console.log("'display' --> lists all words present in trie");
    console.log("'quit' --> terminates program");
  } else if (response === "insert") {
    var word = prompt("Enter a word to insert into the trie >>> ");
    await get(
      "https://us-central1-triedatastructure-eebc0.cloudfunctions.net/trie/words"
    )
      .then((data) => {
        for (var x = 0; x < t.wordsList.length; x++) {
          t.removeKeyword(t.wordsList[x]);
        }
        for (var i = 0; i < data["wordList"].length; i++) {
          t.insertKeyword(data["wordList"][i]);
        }
      })
      .catch((err) => console.log(err));
    var result = t.insertKeyword(word);
    if (result === 0) {
      await put(
        "https://us-central1-triedatastructure-eebc0.cloudfunctions.net/trie/words",
        t.updateWordsList()
      )
        .then((data) => console.log(data))
        .catch((err) => console.log("Updating data in database..."));
      console.log("Word successfully inserted!");
    } else if (result === 1) {
      console.log("Please insert a valid keyword.");
    } else {
      console.log("This word has already been inserted in the trie.");
    }
  } else if (response === "delete") {
    var word = prompt("Enter a word to delete from the trie >>> ");
    await get(
      "https://us-central1-triedatastructure-eebc0.cloudfunctions.net/trie/words"
    )
      .then((data) => {
        for (var x = 0; x < t.wordsList.length; x++) {
          t.removeKeyword(t.wordsList[x]);
        }
        for (var i = 0; i < data["wordList"].length; i++) {
          t.insertKeyword(data["wordList"][i]);
        }
        t.updateWordsList();
        result = data["wordList"].includes(word);
      })
      .catch((err) => console.log(err));
    if (result) {
      t.removeKeyword(word);
      await put(
        "https://us-central1-triedatastructure-eebc0.cloudfunctions.net/trie/words",
        t.updateWordsList()
      )
        .then((data) => console.log(data))
        .catch((err) => console.log("Updating data in database..."));
      console.log("Word successfully deleted!");
    } else {
      console.log("Word does not exist in the trie.");
    }
  } else if (response === "search") {
    var word = prompt("Enter a word to search >>> ");
    await get(
      "https://us-central1-triedatastructure-eebc0.cloudfunctions.net/trie/words"
    )
      .then((data) => {
        for (var x = 0; x < t.wordsList.length; x++) {
          t.removeKeyword(t.wordsList[x]);
        }
        for (var i = 0; i < data["wordList"].length; i++) {
          t.insertKeyword(data["wordList"][i]);
        }
      })
      .catch((err) => console.log(err));
    var result = t.searchWord(word);
    if (result) {
      console.log(`The word '${word}' exists in the trie.`);
    } else {
      console.log(`The word '${word}' does not exist in the trie.`);
    }
  } else if (response === "autocomplete full") {
    var word = prompt("Enter an input prefix >>> ");
    await get(
      "https://us-central1-triedatastructure-eebc0.cloudfunctions.net/trie/words"
    )
      .then((data) => {
        for (var x = 0; x < t.wordsList.length; x++) {
          t.removeKeyword(t.wordsList[x]);
        }
        for (var i = 0; i < data["wordList"].length; i++) {
          t.insertKeyword(data["wordList"][i]);
        }
      })
      .catch((err) => console.log(err));
    t.autoComplete(word, true);
  } else if (response === "autocomplete") {
    var word = prompt("Enter an input prefix >>> ");
    await get(
      "https://us-central1-triedatastructure-eebc0.cloudfunctions.net/trie/words"
    )
      .then((data) => {
        for (var x = 0; x < t.wordsList.length; x++) {
          t.removeKeyword(t.wordsList[x]);
        }
        for (var i = 0; i < data["wordList"].length; i++) {
          t.insertKeyword(data["wordList"][i]);
        }
      })
      .catch((err) => console.log(err));
    t.autoComplete(word);
  } else if (response === "display") {
    await get(
      "https://us-central1-triedatastructure-eebc0.cloudfunctions.net/trie/words"
    )
      .then((data) => {
        console.log(data["wordList"]);
        for (var x = 0; x < t.wordsList.length; x++) {
          t.removeKeyword(t.wordsList[x]);
        }
        for (var i = 0; i < data["wordList"].length; i++) {
          t.insertKeyword(data["wordList"][i]);
        }
      })
      .catch((err) => console.log(err));
    t.printAllWords(t.root, []);
  } else if (response === "quit") {
    process.exit();
  } else {
    console.log("Invalid input. Please try again.");
  }
  t.updateWordsList();
  performOperations();
};

const put = async (url, data) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ wordList: data }),
  });
  const resData = await response.json();
  return resData;
};

const get = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const resData = await response.json();
  return resData;
};

console.log(
  "Welcome to the Trie CLI!\nYou can enter 'quit' anytime to exit the program."
);
try {
  startCLI();
} catch (e) {
  console.log("\nSomething went wrong. Exiting the program...");
  console.log(e);
}

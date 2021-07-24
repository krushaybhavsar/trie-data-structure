var Node = require("./Node");

module.exports = class Trie {
  // class Trie {
  constructor() {
    this.root = new Node("");
    this.wordsList = [];
  }

  // Inserts keywords into trie
  insertKeyword(word) {
    if (word.length === 0) {
      return 1;
    } else if (this.wordsList.includes(word)) {
      return 2;
    }
    let currentNode = this.root;
    for (let i = 0; i < word.length; i++) {
      let index = word.charCodeAt(i) - 97;
      if (!currentNode.children[index]) {
        currentNode.children[index] = new Node(word.charAt(i));
      }
      currentNode = currentNode.children[index];
    }
    currentNode.lastLetter = true;
    this.updateWordsList();
    return 0;
  }

  // Removes keywords from trie
  removeKeyword(word) {
    let currentNode = this.root;
    for (let i = 0; i < word.length; i++) {
      let index = word.charCodeAt(i) - 97;
      if (!currentNode.children[index]) {
        return false;
      }
      currentNode = currentNode.children[index];
    }
    if (currentNode.lastLetter) {
      currentNode.lastLetter = false;
    }
    this.updateWordsList();
    return true;
  }

  // search for a word in the trie
  searchWord(word) {
    let currentNode = this.root;
    for (let i = 0; i < word.length; i++) {
      let index = word.charCodeAt(i) - 97;
      if (!currentNode.children[index]) {
        return false;
      }
      currentNode = currentNode.children[index];
    }
    return currentNode.lastLetter;
  }

  printAllWords(
    root,
    wordArray,
    pos = 0,
    prefix = "",
    updatingWordList = false
  ) {
    if (root === undefined) return;
    if (root.lastLetter) {
      var word = "";
      for (var i = 0; i < pos; i++) {
        word += wordArray[i];
      }
      if (updatingWordList) {
        this.wordsList.push(word);
      } else {
        console.log(prefix + word);
      }
    }
    for (var i = 0; i < root.children.length; i++) {
      if (root.children[i] !== undefined) {
        wordArray[pos] = root.children[i].character;
        this.printAllWords(
          root.children[i],
          wordArray,
          pos + 1,
          prefix,
          updatingWordList
        );
      }
    }
  }

  // return list of auto-complete words
  autoComplete(word, suggestFullWord = false) {
    let wordArray = [];
    let currentNode = this.root;
    for (let i = 0; i < word.length; i++) {
      let index = word.charCodeAt(i) - 97;
      if (currentNode.children[index] === undefined) {
        return [];
      }
      currentNode = currentNode.children[index];
    }
    if (suggestFullWord) {
      this.printAllWords(currentNode, wordArray, 0, word);
    } else {
      this.printAllWords(currentNode, wordArray);
    }
    return wordArray;
  }

  updateWordsList() {
    this.wordsList.splice(0, this.wordsList.length);
    this.printAllWords(this.root, [], 0, "", true);
    return this.wordsList;
  }
};

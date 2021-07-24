module.exports = class Node {
  /* Constructor creates new trie node with 3 properties:
  children --> array of 26 nodes that represent letters (undefined if child at specific location does not exist)
  character --> letter that the node represents
  lastLetter --> represents if node is last letter of specified keyword */
  constructor(character) {
    this.children = new Array(26);
    this.character = character;
    this.lastLetter = false;
  }
};

"use strict";
/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /**Generate random word */ //NOTE: may be better as instance method... maybe we want random word!
  static getRandomWord(words) {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    const chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1] || null;

      if (chains.get(word)) {
        chains.get(word).push(nextWord);
      }
      else {
        chains.set(word, [nextWord]);
      }
    }
    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */
  //use more const over let... only key should be let
  getText() {
    let results = [];
    let key = this.words[0];
    results.push(key);

    while (key !== null) {
      let wordOptions = this.chains.get(key);

      let randWord = MarkovMachine.getRandomWord(wordOptions);

      results.push(randWord);
      key = randWord;
    }

    results.pop(); //uneeded: js is smart enough to remove null entry
    return results.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
//FOR PERSONAL TESTING
let test = new MarkovMachine("The cat is in the hat. The cat is the cat. The hat is a cat.");
const chainsTest = test.getText();
debugger;
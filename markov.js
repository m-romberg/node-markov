/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
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
    // TODO: implement this!
    const chains = new Map ();

    for (let i = 0; i < this.words.length; i++){
      const word = this.words[i];
      const nextWord = this.words[i+1] || null; //NOTE: what happens if not found...

      if (chains.get(word)){
        chains.get(word).push(nextWord);
      }
      else{
        chains.set(word, [nextWord]);
      }
    }
    return chains


  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // TODO: implement this!

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
  }
}

let test = new MarkovMachine("This is a cat. This was a hat.");
const chainsTest = test.getChains();
debugger;
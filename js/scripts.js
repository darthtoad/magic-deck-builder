Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  return this;
}


export class Deck {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.cards = [];
    this.hand = [];
    this.library = [];
  }

  removeCard(card) {
    const index = this.cards.indexOf(card);
    if (index > -1) {
      this.cards.splice(index, 1);
    }
  }

  startingHand() {
    if (this.cards.length > 7) {
      this.cards.forEach(function(card){
        this.library.push(card);
      })
      this.library.shuffle();
      for (let i = 1; i < 8; i++) {
        const cardToAdd = this.cards[Math.floor(Math.random * this.library.length)]
        this.hand.push(cardToAdd);
        const index = this.library.indexOf(cardToAdd);
        if (index > -1) {
          this.library.splice(index, 1);
        }
      }
      return this.hand;
    } else {
      console.log("Not enough cards")
    }
  }
}

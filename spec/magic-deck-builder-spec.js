import { Deck } from "./../js/scripts.js";

describe('Deck', function(){
  it ('should instantiate correctly', function(){
    let deck = new Deck("Poop deck", "Has poop");
    expect(deck instanceof Deck);
  })

  it('should remove cards correctly', function(){
    let deck = new Deck("Poop deck", "Has poop");
    deck.cards.push("32432903", "4354353", "3243232");
    expect(deck.cards.length).toEqual(3);
    deck.removeCard(deck.cards.indexOf("3243232"));
    expect(deck.cards.length).toEqual(2);
    expect(deck.cards.includes("3243232")).toBe(false);
  })

  it('should create a starting hand', function(){
    
  })
})

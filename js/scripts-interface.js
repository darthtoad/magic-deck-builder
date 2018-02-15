import { Deck } from "./../js/scripts.js";

$(document).ready(function(){
  let decks = [];
  $("#form").submit(function(event){
    event.preventDefault();
    $("#result").empty();
    $("#display-deck").empty();
    let name = $('#name').val();
    let colors = $("#colors").val();
    let cmc = parseInt($("#cmc").val());
    let type = $("#type").val();
    let rarity = $("#rarity").val();
    let set = $("#setName").val();
    let text = $("#text").val();
    let power = parseInt($("#power").val());
    let toughness = parseInt($("#toughness").val());
    let language = $("#language").val();
    let legality = $("#legality").val();
    let results = $("#pageSize").val();

    if (typeof name == "undefined" || typeof name == null) {
      name = "";
    } else {
      name.replace(" ", "+")
    }

    if (typeof colors == "undefined" || typeof colors == null) {
      colors = "";
    } else {
      colors.replace(" ", "+")
    }

    if (isNaN(cmc)) {
      cmc = "";
    }

    if (typeof type == "undefined" || typeof type == null) {
      type = "";
    } else {
      type.replace(" ", "+")
    }

    if (typeof rarity == "undefined" || typeof rarity == null) {
      rarity = "";
    } else {
      rarity.replace(" ", "+")
    }

    if (typeof set == "undefined" || typeof set == null) {
      set = "";
    } else {
      set.replace(" ", "+")
    }

    console.log(set);

    if (typeof text == "undefined" || typeof text == null) {
      text = "";
    } else {
      text.replace(" ", "+")
    }

    if (isNaN(power)) {
      power = "";
    }

    if (isNaN(toughness)) {
      toughness = "";
    }

    if (typeof language == "undefined" || typeof language == null) {
      language = "";
    } else {
      language.replace(" ", "+")
    }

    if (typeof legality == "undefined" || typeof legality == null) {
      legality = "";
    } else {
      legality.replace(" ", "+")
    }

    if (isNaN(results)) {
      results = "";
    }

    console.log(name);

    let request = new XMLHttpRequest();
    let url = 'http://api.magicthegathering.io/v1/cards?name=' + name + '&colors=' + colors + '&cmc=' + cmc + '&type=' + type + '&rarity=' + rarity + '&setName=' + set + '&text=' + text + '&power=' + power + '&toughness=' + toughness + '&legality=' + legality + '&pageSize=' + results;
    console.log(url);

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
        console.log(response);
      }
    }
    request.open("GET", url, true);
    request.send();
    let getElements = function(response) {
      let i = 0;
      response.cards.forEach(function(card){
        $("#result").append(`<div class="row"><img src="${card.imageUrl}" alt="Magic Card" /><br>
        Name: ${card.name}<br>Color: ${card.colors}<br>Converted Magic Cost: ${card.cmc}<br>Type: ${card.type}<br>Rarity: ${card.rarity}<br>Set: ${card.set}<br>Card Text: ${card.text}<br>Power/Toughness: ${card.power}/${card.toughness}<br>`);
        if (decks.length > 0) {
          debugger;
          for (let j = 0; j < decks.length; j++) {
            let currentDeck = decks[j];
            $("#result").append(`<br><form id="card${i}deck${j}"><button type="submit">Add ${card.name} to ${currentDeck.name}</button></form><hr>`);
            $("#card" + i + "deck" + j).submit(function(event){
              event.preventDefault();
              console.log(decks[j].name + " Number: " + j);
              decks[j].cards.push(card.id);
            })
          }
          // decks.forEach(function(deck){
          //
          // })
        }
        i++;
      })
    }
  })
  $("#create-deck").submit(function(event){
    event.preventDefault();
    let name = $("#deck-name").val();
    const description = $("#description").val();
    let deck = new Deck(name, description);
    decks.push(deck);
    let newName = deck.name.replace(/\s/g, "-");
    $("#show-deck").append(`<form id="` + newName + `"><button type="submit">Show ${deck.name}</button></form>`);
    alert(`You created new deck ${deck.name}`);
    $("#" + newName).submit(function(event){
      event.preventDefault();
      // debugger;
      $("#display-deck").empty();
      $("#result").empty();
      let cardNames = [];
      deck.cards.forEach(function(card){
        let request = new XMLHttpRequest();
        let url = 'http://api.magicthegathering.io/v1/cards/' + card;
        console.log(url);

        request.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.responseText);
            getElements(response);
            console.log(response);
          }
        }
        request.open("GET", url, true);
        request.send();
        let getElements = function(response) {
          const newName = response.card.name.replace(/\s/g, "-");
          $("#display-deck").append(`<div class="row"><img src="${response.card.imageUrl}" alt="Magic Card" /><br>
          Name: ${response.card.name}<br>Color: ${response.card.colors}<br>Converted Magic Cost: ${response.card.cmc}<br>Type: ${response.card.type}<br>Rarity: ${response.card.rarity}<br>Set: ${response.card.set}<br>Card Text: ${response.card.text}<br>Power/Toughness: ${response.card.power}/${response.card.toughness}</div><br><form id="remove-card-` + newName + `"><button type="submit">Remove Card from Deck</button></form>`);
          $("#remove-card-" + newName).submit(function(event){
          for (let k = 0; k < deck.cards.length; k++) {
            const newName1 = deck.cards[k].name;
            console.log(newName1);
            alert(newName1 + ` is being removed from the deck`);
            if (newName === newName1) {
              deck.removeCard(deck.cards[k]);
              k = 1000;
            }
          }
        })
      }
    })
  })
  })
})

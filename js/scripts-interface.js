$(document).ready(function(){
  $("#form").submit(function(event){
    event.preventDefault();
    $("#result").empty();
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
    let url = 'http://api.magicthegathering.io/v1/cards?name=' + name + '&colors=' + colors + '&cmc=' + cmc + '&type=' + type + '&rarity=' + rarity + '&setName=' + set + '&text=' + text + '&power=' + power + '&toughness=' + toughness + '&language=' + language + '&legality=' + legality + '&pageSize=' + results;
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
      response.cards.forEach(function(card){
        $("#result").append(`<div class="row"><img src="${card.imageUrl}" alt="Magic Card" /><br>
        Name: ${card.name}<br>Color: ${card.colors}<br>Converted Magic Cost: ${card.cmc}<br>Type: ${card.type}<br>Rarity: ${card.rarity}<br>Set: ${card.set}<br>Card Text: ${card.text}<br>Power/Toughness: ${card.power}/${card.toughness}<br>Language: ${card.language}<br>Legality:  ${card.legality}</div><hr>`);
      })
    }
  })
})

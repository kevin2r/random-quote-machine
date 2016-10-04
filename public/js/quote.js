'use strict';

const quotesPath = 'public/js/quotes.json';
let quotes;
let quotesId;
//define 'localQuotes' object to use with codepen.io
let localQuotes = undefined;

if (typeof localQuotes === 'object') {
  quotes = localQuotes;
  quotesId = shuffleIds(quotes);
  nextQuote();
} else {
  //load the quotes.json object using ajax
  $.getJSON(quotesPath).done(function(data) {
    quotes = data;
    quotesId = shuffleIds(quotes);
    nextQuote();
  });
}

function shuffleIds(quotes) {
  let quotesId = Object.keys(quotes);
  //Apply the Fisher-Yates algorithm to randomize the array
  for (let i = quotesId.length - 1; i > 1; i--) {
    let r = Math.floor(Math.random() * i);
    let t = quotesId[i];
    quotesId[i] = quotesId[r];
    quotesId[r] = t;
  }

  return quotesId;
}

function nextQuote() {
  if (quotesId.length === 0) {
    quotesId = shuffleIds(quotes);
  }

  let currentQuote = quotes[quotesId.pop()];
  let author = currentQuote.author;
  let text = currentQuote.text;

  $('.quote .text').animate({
    opacity: 0
  }, 500,
  function() {
    $(this).animate({
      opacity: 1
    }, 500);
    $('.text').html('<i>"' + text + '"</i>');
  });

  $('.quote .author').animate({
    opacity: 0
  }, 500,
  function() {
    $(this).animate({
      opacity: 1
    }, 500);
    $('.author').html('<i>' + author + '</i>');
  });
}

$(document).ready(function run() {
  //event listeners
  $('.quote').on('click', nextQuote);

  $('#tweet-quote').on('click', function() {
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(
      $('.quote .text').text() + ' ' + $('.quote .author').text()));
  });
});

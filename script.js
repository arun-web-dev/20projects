"use strict";

// http://api.forismatic.com/api/1.0

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-btn");
const newQuoteBtn = document.getElementById("new-quote");
//Get Quote from Api

loader.hidden = true;

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

let counter = 1;
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = "https://lit-journey-02196.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    //if author is blank add unknown
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    //Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = data.quoteText;

    //Stop Loader
    removeLoadingSpinner();
  } catch (error) {
    if (counter < 10) {
      setTimeout(getQuote, 5000);
      counter++;
      console.log(counter);
    } else {
      (function () {
        removeLoadingSpinner();
        quoteText.innerText = "Something  went wrong 🤷‍♀️🤷‍♀️🤷‍♀️ came back later";
      })();
    }
  }
}

//twitter url
//https://twitter.com/intent/tweet

//On load
//https: getQuote();

// https://twitter.com/intent/tweet

//Tweetquote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuote();
if (quoteText.innerText == "") {
  loadingSpinner();
}

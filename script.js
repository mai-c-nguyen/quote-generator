const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// let apiQuotes = [];
// fetch("https://type.fit/api/quotes")
//   .then((response) => response.json())
//   .then((apiQuotes) => {
//     newQuoteBtn.addEventListener("click", () => {
//       const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

//       authorText.textContent = quote.author ? quote.author : "Unknown";

//       if (quote.text.length > 120) {
//         quoteText.classList.add("long-quote");
//       } else {
//         quoteText.classList.remove("long-quote");
//       }
//       quoteText.textContent = quote.text;
//     });
//   });

let apiQuotes = [];
// Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
//Show new Quote
function newQuote() {
  loading();
  // pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // check if Author field is blank and replace it with "Unknown"
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //Set Quote, Hide Loading
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes from API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error here
  }
}

getQuotes();

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

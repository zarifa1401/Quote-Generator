const quoteContainer= document.getElementById("quote-container");
const quoteText= document.getElementById("quote");
const authorText= document.getElementById("author");
const twitterBtn= document.getElementById("twitter");
const newQuoteBtn= document.getElementById("new-quote");
const loader= document.getElementById('loader');

let apiQuotes = [];
// show loading
function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;

}
// hide loading
function removeLoadingSpinner(){
    quoteContainer.hidden= false;
    loader.hidden=true;
}
// show new quote
function newQuote(){
    showLoadingSpinner();
    // pick a random quote from apiquotes array
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    //  check if author field is blank and replace it with 'unknown'
    if (!quote.author){
        authorText.textContent='unknown';
    } else {
        authorText.textContent= quote.author;
    }
    //  check quote length to determine styling
    if(quote.text.length> 120){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    // set quote hide loader
      quoteText.textContent=quote.text;
      removeLoadingSpinner();

}
//  get quotes from API
async function getQuotes(){
    loading();
    // const apiUrl= 'https://type.fit/api/quotes';
    const apiUrl='https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        const response= await fetch(apiUrl);
        apiQuotes= await response.json();
        // console.log(apiQuotes[6]);
        newQuote()

    } catch (error){
        // carch error here
    }
}
// tweet quote
function tweetQuote(){
    const twitterUrl=   `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
// Event listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// on load
getQuotes();
// loading();
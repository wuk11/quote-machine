import React, { useEffect, useState } from 'react';
import './App.scss';
import colorArray from "./colors"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'

const quoteDBURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState("The best time to plant a tree was 20 years ago. The second best time is now.")
  const [author, setAuthor] = useState("Chinese Proverb")
  const [quotesArr, setQuotesArr] = useState(null)
  const [bgColor, setBgColor] = useState('#282c34')

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArr(parsedJSON.quotes)
  }

  useEffect(() => {
    fetchQuotes(quoteDBURL)
  }, [quoteDBURL])

  const setQuotesAndAuthors = () => {
    let rand = Math.floor(Math.random() * quotesArr.length)
    let colorIndex = Math.floor(Math.random() * colorArray.length)
    setBgColor(colorArray[colorIndex])
    setQuote(quotesArr[rand].quote);
    setAuthor(quotesArr[rand].author);
  }
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor:bgColor, color:bgColor}}>
        <div id="quote-box" style={{color:bgColor}}>
          <p id="text">
            "{quote}"
          </p>
          <p id="author">
            -{author}
          </p>
          <div className="btn-wrap">
            <div className="tweet-btn">
            <a style={{backgroundColor:bgColor}} target="_blank" id="tweet-quote" href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}><FontAwesomeIcon icon={faXTwitter} /></a>
            </div>
            <button style={{backgroundColor:bgColor}} id="new-quote" onClick={()=>{setQuotesAndAuthors()}}>Next Quote</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

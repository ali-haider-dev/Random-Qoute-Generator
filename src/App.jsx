import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import { faQuoteLeftAlt } from "@fortawesome/free-solid-svg-icons";
import { faQuoteRightAlt } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
function App() {
  const [quotes, setQoutes] = useState({});
  const [fetching, setFetching] = useState(false);
  const fetchQuotes = async () => {
    
    try {
      setFetching(true);
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      const randomData = data[Math.floor(Math.random() * data.length)];
      setQoutes(randomData);
      setFetching(false);
      console.log(randomData);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went Wrong check your internet",
      });
      console.error("Error fetching quotes:", error);
    }
  };

  const Speech =( quoteText,authorName)=>{
    console.log(`${quoteText} by ${authorName}`)
    let synth = window.speechSynthesis
    let utterance = new SpeechSynthesisUtterance(`${quoteText} by ${authorName}`);
    synth.speak(utterance);
  }

  useEffect(() => {
    fetchQuotes();
  }, []);

  console.log(quotes);

  return (
    <div className="main">
      <div className="container">
        <h1 className="title">Qoute Of the day</h1>
        {quotes?.text  ? (
          <>
            <p className="qoute">
              <FontAwesomeIcon
                icon={faQuoteLeftAlt}
                style={{ marginRight: "5px" }}
              />
              {quotes.text} <FontAwesomeIcon icon={faQuoteRightAlt} />
            </p>
            <div className="author">
              <p
                style={{
                  width: "30px",
                  height: "1px",
                  backgroundColor: "black",
                  marginRight: "3px",
                }}
              ></p>
              {quotes.author.split(",")[0]}
            </div>
            <hr />
            <div className="Buttons">
              <div className="options">
                <i
                  className="fas fa-volume-up option-button"
                  onClick={() => Speech(quotes.text,quotes.author.split(",")[0])}
                />
                
                <i className="fas fa-copy option-button" onClick={() => { navigator.clipboard.writeText(quotes.text + "\n " + quotes.author.split(",")[0]); Swal.fire({icon:"success",title:"Qoute is succesfully copied to Clipboard",timer:1500})}} />
              </div>
              <button
                className="qoute-button"
                // disabled={fetching ? true : false}
                onClick={() => fetchQuotes()}
              >
                {" "}
                {fetching ? "Fetching" : "New Qoute"}
              </button>
            </div>
          </>
        ) : (
          
          <>
       
            <p className="qoute">
              <FontAwesomeIcon
                icon={faQuoteLeftAlt}
                style={{ marginRight: "5px" }}
              />
              Never giveup because you never know if the next try is going to be
              the one that works. <FontAwesomeIcon icon={faQuoteRightAlt} />
            </p>
            <div className="author">
              <p
                style={{
                  width: "30px",
                  height: "1px",
                  backgroundColor: "black",
                  marginRight: "3px",
                }}
              ></p>
              Mary Kay Ash
            </div>
            <hr />
            <div className="Buttons">
              <div className="options">
                <i
                  className="fas fa-volume-up option-button"
                  style={{
                    border: "1px solid blue",
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                  onClick={() => {Speech("Never giveup because you never know if the next try is going to be the one that works.","mary Kay Ash")}}
                />
               
                <i
                  className="fas fa-copy option-button"
                  style={{
                    border: "1px solid blue",
                    borderRadius: "50%",
                    padding: "5px",
                    marginLeft: "5px",
                  }}
                  onClick={() => {navigator.clipboard.writeText(" Never giveup because you never know if the next try is going to bethe one that works."+ "\n " + "Mary Kay Ash"); Swal.fire({icon:"success",title:"Qoute is succesfully copied to Clipboard",timer:1500})}}
                />
              </div>
              <button
                className="qoute-button"
              
                onClick={()=>fetchQuotes()}
              >
               
                {"New Qoute"}
              </button>
            </div>
          </>
        )
        }
      </div>
    </div>
  );
}

export default App;

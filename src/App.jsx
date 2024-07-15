import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import { faQuoteLeftAlt } from "@fortawesome/free-solid-svg-icons";
import { faQuoteRightAlt } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
function App() {
  const [quote, setQoute] = useState({});
  const [fetching, setFetching] = useState(false);
  const fetchQuotes = async () => {
    try {
      setFetching(true);
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      const randomQuote = data[Math.floor(Math.random() * data.length)];
      setQoute(randomQuote);
      setFetching(false);
      console.log(randomQuote);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went Wrong check your internet",
      });
      console.error("Error fetching quotes:", error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  console.log(quote);

  return (
    <div className="main">
      <div className="container">
        <h1 className="title">Qoute Of the day</h1>
        {quote?.text ? (
          <>
            <p className="qoute">
              <FontAwesomeIcon
                icon={faQuoteLeftAlt}
                style={{ marginRight: "5px" }}
              />
              {quote.text} <FontAwesomeIcon icon={faQuoteRightAlt} />
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
              {quote.author.split(",")[0]}
            </div>
            <hr />
            <div className="Buttons">
              <div className="options">
                <i
                  className="fas fa-volume-up option-button"
                  onClick={() => {}}
                />
                <i
                  className="fa-brands fa-twitter option-button"
                  onClick={() => {}}
                />
                <i className="fas fa-copy option-button" onClick={() => {}} />
              </div>
              <button
                className="qoute-button"
                disabled={fetching ? true : false}
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
                  className="fas fa-volume-up"
                  style={{
                    border: "1px solid blue",
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                  onClick={() => {}}
                />
                <i
                  className="fa-brands fa-twitter"
                  style={{
                    border: "1px solid blue",
                    borderRadius: "50%",
                    padding: "5px",
                    marginLeft: "5px",
                  }}
                  onClick={() => {}}
                />
                <i
                  className="fas fa-copy"
                  style={{
                    border: "1px solid blue",
                    borderRadius: "50%",
                    padding: "5px",
                    marginLeft: "5px",
                  }}
                  onClick={() => {}}
                />
              </div>
              <button
                className="qoute-button"
                disabled={fetching ? "true" : "false"}
              >
                {" "}
                {"New Qoute"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import Headers from "../../components/Headers/Headers";
function Counter() {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const characterCount = inputText.length;
  return (
    <>
      <Headers></Headers>
      <div className="wrapper">
        <label htmlFor="inputSentence">Enter a sentence:</label>
        <input
          type="text"
          id="inputSentence"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your sentence here..."
        />
        <p>The number of characters in the sentence is: {characterCount}</p>
      </div>
    </>
  );
}

export default Counter;

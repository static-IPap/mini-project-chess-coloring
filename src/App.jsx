import React, { useState } from "react";

const App = () => {
  // input field value
  const [inputValue, setInputValue] = useState("");
  // errormessage if value is not right
  const [errorMessage, setErrorMessage] = useState("");
  //The tile to be changed
  const [highlightedTile, setHighlightedTile] = useState("");

  // initialize rows and columns
  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];

  //function to create tile
  const renderTile = (row, col) => {
    const tileId = `${col}${row}`;
    const isBlack = (row + col.charCodeAt(0)) % 2 === 0;
    const isHighlighted = tileId === highlightedTile;
    // if chosen turn red
    const tileClass = isHighlighted
      ? "bg-red-500"
      : isBlack
      ? "bg-gray-700"
      : "bg-orange-50";
    return <div id={tileId} key={tileId} className={`${tileClass}`}></div>;
  };

  const handleReset = () => {
    setHighlightedTile("");
    setErrorMessage("");
    setInputValue("");
  };

  //transform but check if the tile is vaild
  const handleTransform = () => {
    const validTile = columns.some((col) =>
      rows.some((row) => `${col}${row}` === inputValue)
    );
    if (validTile) {
      setHighlightedTile(inputValue);
      setErrorMessage("");
      setInputValue("");
    } else {
      setErrorMessage("Not a valid tile");
      setInputValue("");
      setTimeout(() => setErrorMessage(""), 2000); // Clear message after 2 sec
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
        <div className="grid grid-cols-9 grid-rows-9 w-[450px] h-[450px] mb-4">
          {/* Empty top-left corner */}
          <div className="w-12 h-12"></div>
          {/* Column labels */}
          {columns.map((col) => (
            <div
              key={col}
              className="flex items-center justify-center w-full h-full text-xs font-bold"
            >
              {col}
            </div>
          ))}
          {/* Row labels and tiles */}
          {rows
            .reverse()
            .map((row) => (
              <React.Fragment key={row}>
                {/* Row label*/}
                <div className="flex items-center justify-center w-full h-full text-xs font-bold">
                  {row}
                </div>
                {/* Tiles for the row */}
                {columns.map((col) => renderTile(row, col))}
              </React.Fragment>
            ))}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
            maxLength={2}
            name="cellInput"
            placeholder="π.χ. A1"
            className="border px-0 py-1 text-center bg-gray-100"
          />
          <button
            onClick={handleTransform}
            className="ml-2 px-4 py-1 bg-blue-500 text-white rounded"
          >
            Transform
          </button>
          <button
            onClick={handleReset}
            className="ml-2 px-4 py-1 bg-gray-500 text-white rounded"
          >
            Reset
          </button>
        </div>
        {errorMessage && (
          <div className="ml-2 text-red-500">{errorMessage}</div>
        )}
      </div>
    </>
  );
};

export default App;

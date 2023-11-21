import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const DogPics = () => {
  const breeds = ["Random", "Beagle", "Boxer", "Dalmatian", "Husky"];
  const [selectedBreed, setSelectedBreed] = useState("Random");
  const [randomDogImage, setRandomDogImage] = useState("");

  const fetchRandomDogImage = () => {
    let apiUrl = "https://dog.ceo/api/breeds/image/random";

    if (selectedBreed != "Random") {
      apiUrl = `https://dog.ceo/api/breed/${selectedBreed}/images/random`;
    }
    axios
      .get(apiUrl)
      .then((response) => setRandomDogImage(response.data.message))
      .catch((error) => console.error("Error fetching dog image:", error));
  };

  const handleEvent = (e) => {
    setSelectedBreed(e.target.value);
    fetchRandomDogImage();
  };
  const handleNextClick = (e) => {
    fetchRandomDogImage();
  };

  useEffect(() => {
    fetchRandomDogImage();
  }, [selectedBreed]);

  return (
    <div>
      <br />
      <label>Select a breed:</label>

      <select value={selectedBreed} onChange={handleEvent}>
        {breeds.map((breed) => (
          <option key={breed} value={breed.toLowerCase()}>
            {breed}
          </option>
        ))}
      </select>
      <div className="spacing"></div>
      {randomDogImage && (
        <img src={randomDogImage} alt="Dog" style={{ maxWidth: "100%" }} />
      )}
      <div className="spacing"></div>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default function App() {
  return <DogPics />;
}

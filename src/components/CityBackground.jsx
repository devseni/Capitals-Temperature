import React, { useState, useEffect } from "react";
import axios from "axios";

const CityBackground = ({ cityName }) => {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const fetchCityImage = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: {
              query: cityName,
              client_id: "JJRJ25b_G3irIPc_GcVkGkYkylwJa42erw-467vuEVA",
              orientation: "landscape",
            },
          }
        );

        // Getting the image URL from the response
        const imageUrl = response.data.urls.regular;
        setBackgroundImage(imageUrl);
      } catch (error) {
        console.error("Error fetching image from Unsplash:", error);
      }
    };

    fetchCityImage();
  }, [cityName]);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        zIndex: "-10",
      }}
    >
      <h1>{cityName}</h1>
    </div>
  );
};

export default CityBackground;

import { useState } from "react";
import axios from "axios";

const useSentimentAnalysis = (message) => {
  const [sentiment, setSentiment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const options = {
    method: "POST",
    url: "https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": "text-analysis12.p.rapidapi.com",
      "x-rapidapi-key": "78ac9139a5msh6de380a1b2e3a51p10a8a2jsn91da228ea5d5",
    },
    data: { language: "english", text: message },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      setSentiment(response.data.sentiment);
    })
    .catch(function (error) {
      console.error(error);
    });

  return sentiment;
};

export default useSentimentAnalysis;

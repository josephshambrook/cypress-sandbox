import React, { useState, useEffect } from "react";
import axios from "axios";
import { TOP_STORIES, GET_ITEM } from "./urls";

const HackerNews = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const topStories = await axios(TOP_STORIES);
      const topItem = topStories.data[0];
      const result = await axios(GET_ITEM(topItem));
      setData(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (!data) {
    return null;
  }

  if (loading) {
    return <h2>Loading Hacker News...</h2>
  }

  const { by, score, title, url } = data;

  return (
    <>
      <h2>Top story from Hacker News</h2>

      <div className="hn-card">
        <div className="hn-card__title">{title}</div>
        <div className="hn-card__meta">
          {score} points | by {by}
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hn-card__link"
        >
          Visit &rarr;
        </a>
      </div>
    </>
  );
};

export default HackerNews;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TOP_STORIES, GET_ITEM } from './urls';

const HackerNews = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const topStories = await axios(TOP_STORIES);

      if (topStories.status !== 200) {
        return Promise.reject('topstories API request errored');
      }

      const topItem = topStories.data[0];
      const itemDetails = await axios(GET_ITEM(topItem));

      if (itemDetails.status !== 200) {
        return Promise.reject('item API request errored');
      }

      setData(itemDetails.data);
      setLoading(false);
    };

    fetchData().catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <h2 data-testid="hn-loading">Loading Hacker News...</h2>;
  }

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const { by, score, title, url } = data;

  return (
    <>
      <h2>Top story from Hacker News</h2>

      <div className="hn-card" data-testid="hn-card">
        <div className="hn-card__title">{title}</div>

        <div className="hn-card__meta">
          {score} points | by {by}
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hn-card__link"
          data-testid="hn-card-link"
        >
          Visit &rarr;
        </a>
      </div>
    </>
  );
};

export default HackerNews;

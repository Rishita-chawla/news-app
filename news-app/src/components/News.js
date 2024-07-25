import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=61894f4324c84fdfb88f5eec5f74e447&pageSize=20&page=${page}`;
      let data = await fetch(url);
      let parsedData = await data.json();

      if (parsedData.status === "ok") {
        setArticles(parsedData.articles || []);
        setTotalResults(parsedData.totalResults || 0);
      } else {
        console.error("API Error:", parsedData.message);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, props.category]);

  const handleNextClick = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevClick = async () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center" style={{ margin: "80px 0" }}>
          NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageURL={element.urlToImage}
                  url={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="container d-flex justify-content-between mb-4">
        <button
          type="button"
          disabled={page <= 1}
          className="btn btn-dark"
          onClick={handlePrevClick}
        >
          &larr; Previous
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalResults / 20)}
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
};

News.defaultProps = {
  country: "in",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;

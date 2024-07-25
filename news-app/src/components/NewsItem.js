import React from "react";

const NewsItem = (props) => {
  let { title, description, imageURL, url, author, date, source } = props;

  return (
    <div className="my-3">
      <div className="card">
        <img
          src={
            !imageURL
              ? "https://bl-i.thgim.com/public/incoming/pih9ho/article68403270.ece/alternates/LANDSCAPE_1200/Stock%20market%20live%20today.jpg"
              : imageURL
          }
          className="card-img-top"
          alt="..."
        />

        <div className="card-body">
          <span
            className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
            style={{ left: "90%", zIndex: 1 }}
          >
            {source}
          </span>
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By-{author ? author : "Unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-dark"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;

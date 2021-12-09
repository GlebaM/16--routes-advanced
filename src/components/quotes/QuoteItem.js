import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import classes from "./QuoteItem.module.css";

const QuoteItem = forwardRef(({ id, text, author, delay }, ref) => {
  const inputRef = ref;
  console.log(inputRef.current);
  return (
    <li
      className={classes.item}
      // style={{ transitionDelay: delay }}
      ref={inputRef}
    >
      <figure>
        <blockquote>
          <p>"{text}"</p>
        </blockquote>
        <figcaption>{author}</figcaption>
      </figure>
      <Link to={`/quotes/${id}`} className="btn">
        View Fullscreen
      </Link>
    </li>
  );
});

export default QuoteItem;

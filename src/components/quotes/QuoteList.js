import { Fragment } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, descending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (!descending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  console.log(match);

  const queryParams = new URLSearchParams(location.search);

  const isSortingDescending = queryParams.get("sort") === "desc";

  const sortedQuotes = sortQuotes(props.quotes, isSortingDescending);

  console.log(isSortingDescending);

  const changeSortingHandler = (e) => {
    // history.push(
    //   `${location.pathname}?sort=${isSortingDescending ? "asc" : "desc"}`
    // );
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingDescending ? "asc" : "desc"}`,
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingDescending ? "Ascending" : "Descending"}!
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;

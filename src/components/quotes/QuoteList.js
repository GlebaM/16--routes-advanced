import { Fragment, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import AnimatedItem from "../animations/AnimatedItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, descending) => {
  return quotes.sort((firstQuote, nextQuote) => {
    if (!descending) {
      return firstQuote.text < nextQuote.text ? 1 : -1;
    } else {
      return firstQuote.text > nextQuote.text ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  console.log(props.quotes);

  // const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortingDescending = queryParams.get("sort") === "desc";

  const sortedQuotes = sortQuotes(props.quotes, !isSortingDescending);

  const changeSortingHandler = (e) => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingDescending ? "asc" : "desc"}`,
    });
  };

  let count = 0;
  console.log(count);
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingDescending ? "Ascending" : "Descending"}!
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => {
          count += 100;

          return (
            <AnimatedItem key={quote.id}>
              <QuoteItem
                key={quote.id}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                ref={useRef()}
                id={quote.id}
                author={quote.author}
                text={quote.text}
              />
            </AnimatedItem>
          );
        })}
      </ul>
    </Fragment>
  );
};

export default QuoteList;

import { Fragment, useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import { CSSTransition } from "react-transition-group";

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error.message}</p>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return (
    <Fragment>
      <CSSTransition in timeout={600} unmountOnExit classNames="fade" appear>
        <h1>All Quotes Page!</h1>
      </CSSTransition>
      <CSSTransition in timeout={600} unmountOnExit classNames="fade" appear>
        <QuoteList quotes={loadedQuotes} />
      </CSSTransition>
    </Fragment>
  );
};

export default AllQuotes;

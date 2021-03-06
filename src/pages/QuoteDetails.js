import { useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { CSSTransition } from "react-transition-group";

const QuoteDetails = () => {
  const match = useRouteMatch();
  const params = useParams();
  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No Quote found</p>;
  }

  console.log(match.url);
  console.log(match.path);
  console.log(quoteId);

  return (
    <CSSTransition in timeout={900} unmountOnExit classNames="fade" appear>
      <div>
        <h1>Great Quote Details! </h1>
        <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
        <Route path={`${match.url}`} exact>
          <div className="centered">
            <Link to={`${match.url}/comments`} className="btn--flat">
              Load Comments
            </Link>
          </div>
        </Route>
        <Route path={`${match.path}/comments`}>
          <Comments />
        </Route>
      </div>
    </CSSTransition>
  );
};

export default QuoteDetails;

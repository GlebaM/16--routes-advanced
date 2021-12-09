import { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
import { CSSTransition } from "react-transition-group";

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  return (
    <Fragment>
      <h1>New Quote Page!</h1>
      <CSSTransition in timeout={600} unmountOnExit classNames="fade" appear>
        <QuoteForm
          isLoading={status === "pending"}
          onAddQuote={addQuoteHandler}
        />
      </CSSTransition>
      ;
    </Fragment>
  );
};

export default NewQuote;

import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";

import LoadingSpinner from "./components/UI/LoadingSpinner";
import { CSSTransition } from "react-transition-group";

const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));
const QuoteDetails = React.lazy(() => import("./pages/QuoteDetails"));
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetails />
          </Route>
          <Route path="/new-quote">
            <CSSTransition
              in
              timeout={900}
              unmountOnExit
              classNames="fade"
              appear
            >
              <NewQuote />
            </CSSTransition>
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;

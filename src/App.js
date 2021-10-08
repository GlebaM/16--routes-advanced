// import { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import QuoteForm from "./components/quotes/QuoteForm";
import AllQuotes from "./pages/AllQuotes";
import QuoteDetails from "./pages/QuoteDetails";
import NewQuote from "./pages/NewQuote";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect path="/quotes" exact />
      </Route>
      <Route path="/quotes" exact>
        <AllQuotes />
      </Route>
      <Route path="/quotes/:quoteId">
        <QuoteDetails />
      </Route>
      <Route path="/new-quotes">
        <NewQuote />
      </Route>
      <QuoteForm></QuoteForm>
    </Switch>
  );
}

export default App;

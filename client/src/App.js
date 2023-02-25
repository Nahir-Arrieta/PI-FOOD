import { Route } from "react-router-dom";
import { Home, Details, Form, LandingPage } from "./Pages";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <Route exact path={["/home", "/form", "/home/:id"]}>
        <NavBar />
      </Route>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/home/:id">
        <Details />
      </Route>
      <Route exact path="/form">
        <Form />
      </Route>
    </div>
  );
}

export default App;

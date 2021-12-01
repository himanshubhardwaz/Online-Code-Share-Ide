import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditorScreen from "./Screens/EditorScreen"
import LoginScreen from "./Screens/LoginScreen"

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginScreen />
          </Route>
          <Route path="/editor">
            <EditorScreen />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditorScreen from "./Screens/EditorScreen"

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/editor">
            <EditorScreen />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

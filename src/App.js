import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditorScreen from "./Screens/EditorScreen"
import LoginScreen from "./Screens/LoginScreen"
import DashboardScreen from "./Screens/Dashboard/index"
import ProjectScreen from './Screens/Projects';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginScreen />
          </Route>
          <Route exact path="/editor">
            <EditorScreen />
          </Route>
          <Route path="/editor/:id">
            <EditorScreen />
          </Route>
          <Route path="/dashboard">
            <DashboardScreen />
          </Route>
          <Route path="/projects">
            <ProjectScreen />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

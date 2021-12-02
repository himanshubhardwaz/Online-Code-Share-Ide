import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditorScreen from "./Screens/EditorScreen"
import LoginScreen from "./Screens/LoginScreen"
import DashboardScreen from "./Screens/Dashboard/index"
import ProjectScreen from './Screens/Projects';
import InterviewScreen from "./Screens/Interviews"
import InterviewRoom from './Screens/InterviewRoom';

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
          <Route path="/interviews">
            <InterviewScreen />
          </Route>
          <Route path="/interview-room/:id">
            <InterviewRoom />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

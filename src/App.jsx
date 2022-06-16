import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Users from "./layouts/users";
import NavBar from "./ui/navbar";
import AddNewUser from "./components/addNewUser";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/users/add" component={AddNewUser} />
        <Route path="/users/:userId?" component={Users} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;

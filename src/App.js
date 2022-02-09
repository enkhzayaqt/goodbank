import * as React from "react";
import { Route, HashRouter } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./pages/home";
import Deposit from "./pages/deposit";
import CreateAccount from "./pages/createAccount";
import Withdraw from "./pages/withdraw";
import AllData from "./pages/alldata";
import Login from "./pages/login";
import Profile from "./pages/profile";
import { UserContext } from "./context";

function App() {
  return (
    <HashRouter>
      <NavBar />
      <div className="container" style={{ padding: "20px" }}>
        <UserContext.Provider
          value={{ session: {}, users: [], activities: [] }}
        >
          <Route path="/" exact component={Home} />
          <Route path="/deposit" component={Deposit} />
          <Route path="/register" component={CreateAccount} />
          <Route path="/login" component={Login} />
          <Route path="/withdraw" component={Withdraw} />
          <Route path="/alldata" component={AllData} />
          <Route path="/profile" component={Profile} />
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

export default App;

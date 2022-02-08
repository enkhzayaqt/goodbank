import * as React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./pages/home";
import Deposit from "./pages/deposit";
import CreateAccount from "./pages/createAccount";
import Login from "./pages/login";
import Withdraw from "./pages/withdraw";
import AllData from "./pages/alldata";
import { UserContext } from "./context";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <UserContext.Provider
        value={{
          session: {
            name: "abel",
            email: "abel@mit.edu",
            password: "secret",
            balance: 100,
          },
          users: [{ name: "123" }],
          actions: [],
        }}
      >
        <div className="container" style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/register" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/alldata" element={<AllData />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Route, Redirect } from "react-router-dom";

// pages
import LandingPage from "./pages/LandingPage"
import SignUp from "./pages/SignUp"

function App() {
    
  // Private Route
    const PrivateRoute = ({ component: Component, ...rest }) => {
        const user = localStorage.getItem("jwtToken");
        return (
            <Route
                {...rest}
                render={(props) => {
                    return user ? (
                        <Component {...rest} {...props} />
                    ) : (
                        <Redirect to="/" />
                    );
                }}
            />
        );
    };

    return (

      <div className="App">
        <Route 
          exact
          path="/"
          render={() => {
            return (
              <LandingPage />
            )
          }}
        />
        <Route 
          exact
          path="/account"
          render={() => {
            return (
              <SignUp />
            )
          }}
        />
      </div>
    )
}

export default App;

import "./styles/App.scss";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Route, Redirect } from "react-router-dom";

// pages
import LandingPage from "./pages/LandingPage"
import SignUp from "./pages/SignUp"

// components
import Navigation from './components/Navigation'

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
        <Navigation />
        <div>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <LandingPage />
              )
            }}
          />
        </div>
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

import "./styles/App.scss";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

// pages
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

// components
import Navigation from "./components/Navigation";

// utils
import setAuthToken from "./utils/setAuthToken";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [currentUser, setCurrentUser] = useState("");
    const SERVER = process.env.REACT_APP_SERVER;
    const history = useHistory()

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

    // Handle Login
    const handleLogin = async (values) => {
        try {
            // look for user
            const requestedUser = await axios.post(`${SERVER}/users/login`, {
                username: values.username,
                password: values.password,
            });
            console.log(requestedUser);
            // extract token
            const { token } = requestedUser.data;
            // add to local storage
            localStorage.setItem("jwtToken", token);
            // set token
            setAuthToken(token);
            // decode token
            const userInfo = jwt_decode(token);
            // set the current user
            setCurrentUser(userInfo);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
        if (localStorage.getItem("jwtToken")) {
            localStorage.removeItem("jwtToken");
        }
    };

    const handleSignUp = async (values) => {
        console.log("registeringgg!!!");

        try {
            const createdUser = await axios.post(`${SERVER}/users/signup`, {
                username: values.username,
                email: values.email,
                password: values.password,
            });
            console.log(createdUser);
            // if (createdUser) {
            //   handleLogin(values)
            // }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="App">
            <Navigation isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
            <div>
                <Route
                    exact
                    path="/"
                    render={() => {
                        return <LandingPage />;
                    }}
                />
            </div>
            <Route
                exact
                path="/register"
                render={() => {
                    return <SignUp handleSignUp={handleSignUp} />;
                }}
            />
            <Route
                exact
                path="/login"
                render={() => {
                    return <LogIn handleLogin={handleLogin} />;
                }}
            />
        </div>
    );
}

export default App;

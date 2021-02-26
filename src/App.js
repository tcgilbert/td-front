import "./styles/App.scss";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { Route, Redirect, useHistory, Switch } from "react-router-dom";

// pages
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import ManageProfile from "./pages/ManageProfile";
import UserPage from "./pages/UserPage";
import Account from "./pages/Account";

// utils
import setAuthToken from "./utils/setAuthToken";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [currentUser, setCurrentUser] = useState("");
    const [showAlert, setShowAlert] = useState(false)
    const SERVER = process.env.REACT_APP_SERVER;
    const history = useHistory();

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

    // Check for token in local storage
    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("jwtToken");
            if (token) {
                try {
                    const apiRes = await axios.post(
                        `${SERVER}/users/check-token`,
                        {
                            token,
                        }
                    );
                    if (apiRes.data.userFound) {
                        const userInfo = jwt_decode(token);
                        setCurrentUser(userInfo);
                        setIsAuthenticated(true);
                        setAuthToken(token);
                    }
                } catch (error) {
                    console.log(error);
                    handleLogout();
                    setShowAlert(true)
                }
            } else {
                console.log("no token :(");
            }
        };
        checkToken();
    }, []);

    // Handle Login
    const handleLogin = async (values) => {
        try {
            // look for user
            const requestedUser = await axios.post(`${SERVER}/users/login`, {
                username: values.username,
                password: values.password,
            });
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
            history.push("/manage");
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    };

    //  Handle Log out
    const handleLogout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
        if (localStorage.getItem("jwtToken")) {
            localStorage.removeItem("jwtToken");
        }
    };

    // Handle Sign up
    const handleSignUp = async (values) => {
        try {
            const createdUser = await axios.post(`${SERVER}/users/signup`, {
                username: values.username,
                email: values.email,
                password: values.password,
            });
            if (createdUser) {
                handleLogin(values);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="App">
            <div>
                <Route
                    exact
                    path="/"
                    render={() => {
                        return (
                            <LandingPage
                                isAuthenticated={isAuthenticated}
                                handleLogout={handleLogout}
                                showAlert={showAlert}
                                setShowAlert={setShowAlert}
                            />
                        );
                    }}
                />
            </div>
            <Switch>
                <Route
                    exact
                    path="/register"
                    render={() => {
                        return <SignUp handleSignUp={handleSignUp} />;
                    }}
                />
                <PrivateRoute
                    exact
                    path="/account"
                    component={Account}
                    user={currentUser}
                    isAuthenticated={isAuthenticated}
                    handleLogout={handleLogout}
                />
                <Route
                    exact
                    path="/login"
                    render={() => {
                        return <LogIn handleLogin={handleLogin} />;
                    }}
                />
                <PrivateRoute
                    exact
                    path="/manage"
                    component={ManageProfile}
                    user={currentUser}
                    handleLogout={handleLogout}
                    isAuthenticated={isAuthenticated}
                    setCurrentUser={setCurrentUser}
                />
                <Route exact path="/:username" component={UserPage} />
            </Switch>
        </div>
    );
}

export default App;

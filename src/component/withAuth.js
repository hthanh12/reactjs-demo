import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom"

const withAuth = (Component) => {
    const AuthRoute = () => {
        const isAuth = !!localStorage.getItem("iws");
        if (isAuth) {
            return <Component />;
        } else {
            return <Redirect to="/" />;
        }
    };

    return AuthRoute;
};

export { withAuth }
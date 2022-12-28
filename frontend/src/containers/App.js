import './App.css';
import SignIn from "./SignIn";
import MainPage from "./MainPage"
import SignUp from "./SignUp"
import Profile from "./Profile";
import { RequireAuth } from "react-auth-kit";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => (
    <Router>
        <Routes>
            <Route path={"/"} element={
                <RequireAuth loginPath={"/login"}>
                    <MainPage />
                </RequireAuth>} />
            <Route path={"/login"} element={<SignIn />} />
            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/profile"} element={<Profile />} />
        </Routes>
    </Router>
);

export default App;

import './App.css';
import SignIn from "./SignIn";
import MainPage from "./MainPage"
import SignUp from "./SignUp"
import Profile from "./Profile";
import Leaderboard from "./Leaderboard";
import { RequireAuth } from "react-auth-kit";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => (
    <Router>
        <Routes>
            <Route path={"/"} element={
                <RequireAuth loginPath={"/signin"}>
                    <MainPage />
                </RequireAuth>} />
            <Route path={"/signin"} element={<SignIn />} />
            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/profile/:username"} element={
                <RequireAuth loginPath={"/signin"}>
                    <Profile />
                </RequireAuth>} />
            <Route path={"/leaderboard"} element={
                <RequireAuth loginPath={"/signin"}>
                    <Leaderboard />
                </RequireAuth>} />
        </Routes>
    </Router>
);

export default App;

import { useSignOut } from 'react-auth-kit'
import { useNavigate } from "react-router-dom"

const MainPage = () => {
    const signOut = useSignOut();
    const navigate = useNavigate();
    const mySignOut = () => {
        signOut();
        navigate("/signin");
    }
    
    return (
        <>
            <h1>Main Page</h1>
            <button onClick={mySignOut}>Sign Out</button>
            <button onClick={() => {navigate("/profile")}}>Profile</button>
        </>
    )
}

export default MainPage
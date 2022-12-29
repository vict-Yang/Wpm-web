import { useSignOut, useAuthUser } from 'react-auth-kit'
import { useNavigate } from "react-router-dom"

const MainPage = () => {
    const signOut = useSignOut();
    const navigate = useNavigate();
    const auth = useAuthUser();
    const username = auth().name;

    const mySignOut = () => {
        signOut();
        navigate("/signin");
    }
    
    return (
        <>
            <h1>Main Page</h1>
            <button onClick={mySignOut}>Sign Out</button>
            <button onClick={() => {navigate(`/profile/${username}`)}}>Profile</button>
        </>
    )
}

export default MainPage
import { useOutletContext } from "react-router-dom";

const HomePage = () => {
    const {user} = useOutletContext()
    return(
        <>
            <h1>HomePage</h1>
            {user && <h5>{user}</h5>}
        </>
    )
}

export default HomePage;
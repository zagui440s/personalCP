import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <>
            <h1>Home Page</h1>
            <nav>
                <ul>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
        </>
    );
}
import { Link, Outlet } from 'react-router-dom';

export default function App() {
    return (
        <div>
            <header>
                <h1>This section is common to all pages</h1>
                <nav>
                    <h2>Navbar</h2>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/doesnt-exist">Example invalid route</Link></li>
                        <li><Link to="/pokemon/44">Example pokepage</Link></li>
                    </ul>
                </nav>
            </header>
            <section className="sub-page-container">
                <Outlet />
            </section>
        </div>
    );

}
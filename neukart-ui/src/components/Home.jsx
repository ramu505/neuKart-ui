import { Outlet, Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/signup">SingUp</Link>
                    </li>
                    <li>
                        <Link to="/signin">SingIn</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Home;
import { Link } from "react-router-dom";

function Landing() {
    return (
        <div>
            <h1>Carrer Compass</h1>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/signup">
                <button>SignUp</button>
            </Link>
        </div>
    );
}

export default Landing;
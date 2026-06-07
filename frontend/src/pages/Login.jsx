import { useState } from "react";
import { login } from "../services/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await login(email, password);
            alert("Login sucessfull");
        } catch (err) {
            console.log("Hi1");
            console.log(err);
            console.log(err.code);
            console.log(err.message);
            console.error(err.message)
        }
    };

    return (
        <div>
            <form>
                <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="text" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
}

export default Login;
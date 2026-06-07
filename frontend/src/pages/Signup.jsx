import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/auth";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSignup = async () => {
        try {
            await signup(email, password);
            alert("Account Created");
            navigate("/login");
        } catch (err) {
            navigate("/signup");
            alert(err.message);
            console.log("Hi");
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
                <button type="button" onClick={handleSignup}>SignUp</button>
            </form>
        </div>
    );
}
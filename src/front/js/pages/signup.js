import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export function Signup() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        const success = await actions.Signup(user);
        if (success) {
            navigate("/");
        } else {
            setError("Signup failed. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Signup</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                onChange={handleChange}
                                value={user.email}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                onChange={handleChange}
                                value={user.password}
                                minLength="6"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={handleChange}
                                value={user.confirmPassword}
                                minLength="6"
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn btn-primary">Signup</button>
                    </form>
                    <Link to="/">Already have an account?</Link>
                </div>
            </div>
        </div>
    );
}

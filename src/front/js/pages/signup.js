import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export function Signup() {
    const [User, setUser] = useState({
        email: "",
        password: "",
    });
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...User, [e.target.name]: e.target.value });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.Signup(User);
        navigate("/");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Signup</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={User.email} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" onChange={handleChange} value={User.password} />
                        </div>
                        <button type="submit" className="btn btn-primary ">Signup</button>
                    </form>
                    <Link to="/">Already have an account?</Link>
                </div>
            </div>
        </div>
    )
}
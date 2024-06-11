const getState = ({ getStore, getActions, setStore }) => {
    const backendURL = process.env.BACKEND_URL || "http://localhost:5000"; // Cambiar la URL según sea necesario

    return {
        store: {
            token: null,
        },
        actions: {
            Signup: async (user) => {
                try {
                    const response = await fetch(`${backendURL}/api/signup`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    });
                    const data = await response.json();
                    if (data.token) {
                        setStore({ token: data.token });
                    }
                } catch (error) {
                    console.error("Error during signup:", error);
                }
            },
            Login: async (user) => {
                try {
                    const response = await fetch(`${backendURL}/api/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    });
                    const data = await response.json();
                    if (data.token) {
                        setStore({ token: data.token });
                    }
                } catch (error) {
                    console.error("Error during login:", error);
                }
            },
            Logout: () => {
                setStore({ token: null });
            }
        }
    };
};

export default getState;

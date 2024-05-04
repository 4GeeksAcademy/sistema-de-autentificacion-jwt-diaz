import Signup from "../pages/signup";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
		},
		actions: {
			Signup: async (user) => {
				const store = getStore();
				const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: user.email,
						password: user.password
					})
				});
				const data = await response.json();
				if (data.token) {
					setStore({ token: data.token });
				}
			},
			Login: async (user) => {
				const store = getStore();
				const response = await fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: user.email,
						password: user.password
					})
				});
				const data = await response.json();
				if (data.token) {
					setStore({ token: data.token });
				}
			},
			Logout: () => {
				setStore({ token: null });
			}
		}
	};
};
export default getState;

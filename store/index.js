export const state = () => ({
	user: {}
});

export const mutations = {
	auth(state, user) {
		state.user = user;
	},
	addF(state, user) {
		state.user.friend.push(user);
	}
};
export const strict = false;

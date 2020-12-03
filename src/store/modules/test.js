const state = {
    count: 133,
};

const mutations = {
    SET_COUNT: (state, count) => {
        state.count = count;
    },
};
const actions = {
    setCountAdd: ({commit, state}) => {
        commit('SET_COUNT', state.count + 1);
    },
    setCountReduce: ({commit, state}) => {
        commit('SET_COUNT', state.count - 1);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

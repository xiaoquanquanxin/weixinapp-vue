const state = {
    totalMoney: 0,

};
const mutations = {
    SET_COUNT: (state, count) => {
        state.totalMoney = count;
    },
};
const actions = {
    setTotalMoney: ({commit, state},value) => {
        commit('SET_COUNT', value);
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
}

const state = {
    totalMoney: 0,
    cmdsId: "",

};
const mutations = {
    SET_COUNT: (state, count) => {
        state.totalMoney = count;
    },
    SET_CMIDS: (state, value) => {
        state.cmdsId = value;
    },
};
const actions = {
    // 未缴账单总费用
    setTotalMoney: ({commit},value) => {
        commit('SET_COUNT', value);
    },
    //  选中的房间
    setCmdsId: ({commit},value) => {
        console.log(value)
        commit('SET_CMIDS', value);
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
}

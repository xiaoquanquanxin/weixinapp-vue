const state = {
    allChecked: false,

};

const mutations = {
    SET_CHECKED: (state,allChecked) => {
        state.allChecked = allChecked;
    },
};
const actions = {
    setAllChecked: ({commit},allChecked) => {
        commit('SET_CHECKED',allChecked);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

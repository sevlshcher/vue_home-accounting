import firebase from 'firebase/app';

export default {
  state: {
    userData: {}
  },
  getters: {
    getUserData: s => s.userData
  },
  actions: {
    async fetchUserData ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUserId');
        const userData = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
        commit('setUserData', userData);
      } catch (e) {
        throw e;
      }
    },
    getUserId() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    }
  },
  mutations: {
    setUserData(state, userData) {
      state.userData = userData;
    },
    clearUserData(state) {
      state.userData = {};
    }
  }
}
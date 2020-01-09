import firebase from 'firebase/app';

export default {
  actions: {
    async createCategory ({ dispatch, commit }, { title, limit }) {
      try {
        const uid = await dispatch('getUserId');
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit });

        return { title, limit, id: category.key };

      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchCategories ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUserId');
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};

        return Object.keys(categories).map(key => ({...categories[key], id: key}));

      } catch (e) {
        commit('setError', e);
        throw e;
      }
    }
  }
}
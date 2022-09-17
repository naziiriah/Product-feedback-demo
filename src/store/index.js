import { createStore } from "vuex";
import { DB } from "../db";

export default createStore({
  state: {
    Data: DB,
  },
  getters: {},
  mutations: {
    updateVote(state, { CheckVoteStatus, id }) {
      if (CheckVoteStatus) {
        state.Data.productRequests.find((status) => status.id === id).upvotes--;
        state.Data.productRequests.find(
          (status) => status.id === id
        ).voted = false;
      } else {
        state.Data.productRequests.find((status) => status.id === id).upvotes++;
        state.Data.productRequests.find(
          (status) => status.id === id
        ).voted = true;
      }
    },
    addFeedback(state, props) {
      state.Data.productRequests.push(props);
      alert("Added feedback!!!");
    },
    editFeedback(state, props) {
      state.Data.productRequests.find(
        (state) => state.id === props.id
      ).category = props.category;
      state.Data.productRequests.find(
        (state) => state.id === props.id
      ).description = props.description;
      state.Data.productRequests.find((state) => state.id === props.id).title =
        props.title;
      state.Data.productRequests.find((state) => state.id === props.id).status =
        props.status;
      alert("Updated Feedback!!!");
    },
    deleteFeedback(state, props) {
      const newState = state.Data.productRequests.filter(
        (state) => state.id !== props.id
      );
      state.Data.productRequests = newState;
      alert("Deleted!!!");
    },
    postCommment(state, props) {
      state.Data.productRequests
        .find((state) => state.id === props.id)
        .comments.push(props.props);
    },
  },
  actions: {
    updateVote({ commit, state }, { id }) {
      const CheckVoteStatus = state.Data.productRequests.find(
        (status) => status.id === id
      ).voted;
      commit("updateVote", { CheckVoteStatus, id });
    },
    addFeedback({ commit, state }, props) {
      const CheckID = state.Data.productRequests.filter(
        (state) => state.id === props.id
      );

      if (CheckID.length === 0) {
        commit("addFeedback", props);
      } else {
        props.id++;
        commit("addFeedback", props);
      }
    },
    editFeedback({ commit, state }, props) {
      const CurrentState = state.Data.productRequests.find(
        (state) => state.id === props.id
      );
      if (CurrentState) {
        commit("editFeedback", props);
      }
    },
    deleteFeedback({ commit, state }, props) {
      const CurrentState = state.Data.productRequests.filter(
        (state) => state.id === props.id
      );
      if (CurrentState.length === 1) {
        commit("deleteFeedback", props);
      }
    },
    postCommment({ commit, state }, props) {
      const CurrentState = state.Data.productRequests.filter(
        (state) => state.id === props.id
      );
      if (CurrentState.length === 1) {
        commit("postCommment", props);
      }
    },
  },
  modules: {},
});

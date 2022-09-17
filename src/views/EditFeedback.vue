<template>
  <main class="container__edit">
    <header class="add__header">
      <a @click="goBack" class="add__link">
        <i class="fa-solid fa-angle-left"></i>
        go back</a
      >
    </header>
    <section class="edit__section">
      <div class="add__design">
        <i class="fa-solid fa-pen-nib"></i>
      </div>
      <div class="add__container--mini">
        <h4 class="add__title">Editing `{{ state.title }}`</h4>
        <form @submit.prevent="OnSubmit">
          <div>
            <label class="add__label" for="title">feedback title</label>
            <h4 class="add__desscription">Add a short, descriptive headline</h4>
            <input
              type="text"
              name="title"
              v-model="title"
              placeholder="Add feedback title"
            />
          </div>
          <div>
            <label class="add__label" for="title">category</label>
            <h4 class="add__desscription">
              Choose a cetegory for your feedback
            </h4>
            <select v-model="category" name="category">
              <option value="feature">Feature</option>
              <option value="ui">UI</option>
              <option value="ux">UX</option>
              <option value="bug">bug</option>
              <option value="enhancement">Enhancement</option>
            </select>
          </div>
          <div>
            <label class="add__label" for="status">update status</label>
            <h4 class="add__desscription">Change feedback status</h4>
            <select v-model="status" name="status">
              <option value="suggestion">Suggestion</option>
              <option value="planned">Planned</option>
              <option value="live">live</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
          <div>
            <label class="add__label" for="title">feedback detail</label>
            <h4 class="add__desscription">
              Include any specific comments on what could be improved, added,
              e.t.c
            </h4>
            <textarea
              name="description"
              v-model="description"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div class="edit__buttons">
            <button class="edit__delete" @click="onDelete">delete</button>
            <div class="add__buttons">
              <button class="add__button--cancel" @click="refactor">
                cancel
              </button>
              <button class="add__button--add" type="submit">
                save changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<script>
import createStore from "../store/index";
import { useRoute } from "vue-router";

const store = createStore.state.Data.productRequests;

export default {
  name: "EditFeedback",
  setup() {
    const route = useRoute();
    const ID = route.params.id;
    const state = store.find((state) => state.id === Number(ID));
    return {
      title: state.title,
      state,
      category: state.category,
      description: state.description,
      status: state.status,
    };
  },
  methods: {
    onDelete() {
      const props = {
        id: this.state.id,
      };
      createStore.dispatch("deleteFeedback", props);
      this.$router.push("/");
    },
    OnSubmit() {
      const props = {
        id: this.state.id,
        title: this.title,
        category: this.category,
        description: this.description,
        status: this.status,
      };
      createStore.dispatch("editFeedback", props);
    },
    goBack() {
      this.$router.go(-1);
    },
    refactor() {
      this.$router.go();
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
  .container__edit {
    width: 100%;
    background-color: #f2f2f2;
    min-height: 140vh;
  }
  .add__buttons {
    display: flex;
    flex-direction: column;
  }
  .add__button--add {
    order: 1;
  }
  .edit__section {
    width: 90%;
    min-height: 45rem;
    margin: 1rem auto 0rem;
    background-color: #fff;
    border-radius: 7px;
    border: solid transparent 1px;
  }
  .edit__buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .edit__delete {
    width: 100%;
    height: 2rem;
    margin-bottom: 1rem;
    text-transform: capitalize;
    color: #f2f4fe;
    border: solid transparent 2px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    background-color: #d73737;
    order: 2;
  }
}
@media screen and (max-width: 1100px) and (min-width: 600px) {
  .edit__section {
    width: 60%;
    height: 45rem;
    margin: 1rem auto 0rem;
    background-color: #fff;
    border-radius: 7px;
    border: solid transparent 1px;
  }
  .edit__buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .edit__delete {
    padding: 0rem 10px;
    height: 2rem;
    margin-left: 1rem;
    text-transform: capitalize;
    color: #f2f4fe;
    border: solid transparent 2px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    background-color: #d73737;
  }
  .container__edit {
    width: 100%;
    background-color: #f2f2f2;
    min-height: 120vh;
  }
}
@media screen and (min-width: 1100px) {
  .edit__section {
    width: 35%;
    height: 43rem;
    margin: 1rem auto 0rem;
    background-color: #fff;
    border-radius: 7px;
    border: solid transparent 1px;
  }
  .edit__buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .edit__delete {
    padding: 0rem 10px;
    height: 2rem;
    margin-left: 1rem;
    text-transform: capitalize;
    color: #f2f4fe;
    border: solid transparent 2px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    background-color: #d73737;
  }
  .container__edit {
    width: 100%;
    background-color: #f2f2f2;
    min-height: 130vh;
  }
}
</style>

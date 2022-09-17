<template>
  <main class="container">
    <header class="feedback__header">
      <a @click="goBack" class="add__link">
        <i class="fa-solid fa-angle-left"></i>
        go back</a
      >
      <button class="feedback__buttons--edit--button" @click="toRoute">
        edit feedback
      </button>
    </header>
    <section class="feedback__section">
      <article class="home__article">
        <div class="home__votes">
          <div
            :class="[
              state.voted ? 'home__voted--active' : 'home__voted--deactive',
            ]"
            @click="updateVote(state.id)"
          >
            <i class="fa-solid fa-angle-up"></i>
            <h3>{{ state.upvotes }}</h3>
          </div>
        </div>
        <div class="home__category">
          <h2>{{ state.title }}</h2>
          <h4>{{ state.description }}</h4>

          <button>{{ state.category }}</button>
        </div>
        <div class="home__comments">
          <div class="home__comments--content">
            <i class="fa-regular fa-comment"></i>
            {{ CommentsLength(state.id) }}
          </div>
        </div>
      </article>
    </section>
    <section class="feedback__comments">
      <div class="feedback__container">
        <h4>{{ CommentsLength(state.id) }} comments</h4>
        <article
          :key="stat.id"
          class="feedback__comment"
          v-for="stat in state.comments"
        >
          <div class="feedback__comment--head">
            <img :src="stat.user.image" :alt="stat.user.name" />
            <div>
              <h2>{{ stat.user.name }}</h2>
              <h4>@{{ stat.user.username }}</h4>
            </div>
            <h2>reply</h2>
          </div>
          <p class="feedback__comment--content">
            {{ stat.content }}
          </p>
        </article>
      </div>
    </section>
    <section class="feedback__add__comments">
      <div class="feedback__container">
        <h4>add comments</h4>
        <form class="feedback__post" @submit.prevent="OnSubmit">
          <textarea
            v-model="text"
            name=""
            maxlength="250"
            id=""
            cols="30"
            rows="10"
            placeholder="Type your comments here"
          ></textarea>
          <div>
            <h5>{{ CalculateTextLength() }} characters left</h5>
            <button type="submit" class="feedback__submit--button">
              post comment
            </button>
          </div>
        </form>
      </div>
    </section>
    <footer class="feedback__footer"></footer>
  </main>
</template>

<script>
// @ is an alias to /src
import createStore from "../store/index";
import { useRoute } from "vue-router";

const Store = createStore.state.Data.productRequests;
const Commenter = createStore.state.Data.currentUser;

export default {
  name: "FeedbackDetail",
  setup() {
    const route = useRoute();
    const ID = route.params.id;
    const state = Store.find((state) => state.id === Number(ID));

    return {
      state,
    };
  },
  data() {
    return {
      text: "",
      // eslint-disable-next-line no-undef
    };
  },
  methods: {
    CalculateTextLength() {
      return 250 - this.text.length;
    },
    CommentsLength(num) {
      return Store.find((state) => state.id === num).comments.length;
    },
    updateVote(id) {
      createStore.dispatch("updateVote", { id: id });
    },
    toRoute() {
      this.$router.push(`/edit-feedback/${Number(this.state.id)}`);
    },
    OnSubmit() {
      const props = {
        id: Math.floor(Math.random() * 1000),
        content: this.text,
        user: {
          image: Commenter.image,
          name: Commenter.name,
          username: Commenter.username,
        },
      };
      createStore.dispatch("postCommment", {
        id: this.state.id,
        props,
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
@media screen and (max-width: 600px) {
  .feedback__header {
    width: 90%;
    margin: 0rem auto;
    height: 3rem;
    padding-top: 3rem;
    text-transform: capitalize;
    text-align: start;
    display: flex;
    justify-content: space-between;
  }
  .feedback__buttons--edit--button {
    padding: 0px 12px;
    color: #f2f4fe;
    background-color: #4661e6;
    border-radius: 8px;
    border: solid 2px transparent;
    text-transform: capitalize;
    font-size: 14px;
    font-weight: bold;
    height: 2.5rem;
    margin-top: -0.9rem;
    cursor: pointer;
  }
  .feedback__section {
    width: 90%;
    margin: 1rem auto 2rem;
  }
  .feedback__comments {
    width: 90%;
    margin: 1rem auto 1rem;
    background-color: #fff;
    min-height: 4rem;
    border-radius: 8px;
  }
  .feedback__add__comments {
    width: 90%;
    margin: 2rem auto 0rem;
    background-color: #fff;
    min-height: 13rem;
    border-radius: 8px;
  }
  .feedback__container {
    width: 90%;
    margin: 0rem auto;
    h4 {
      word-spacing: 6px;
      text-align: start;
      line-height: 4rem;
      font-size: 14px;
      color: #3a4374;
      font-weight: bold;
      text-transform: capitalize;
    }
  }
  .feedback__comment {
    width: 100%;
    margin: 0.3rem 0rem;
  }
  .feedback__comment--head {
    display: flex;
    justify-content: space-between;
    height: 4rem;
    width: 100%;
    img {
      border-radius: 50%;
      width: 2.5rem;
      height: 2.5rem;
    }
    h2 {
      color: #4661e6;
      text-transform: capitalize;
      font-size: 13px;
      font-weight: 600;
    }
    div {
      width: 40rem;
      height: 3rem;
      h2 {
        width: 100%;
        text-align: start;
        display: flex;
        justify-content: flex-start;
        margin-bottom: -1.5rem;
        color: #3a4374;
        font-weight: bold;
        font-size: 14px;
      }
      h4 {
        width: 100%;
        text-align: start;
        display: flex;
        justify-content: flex-start;
        color: #647196;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
  .feedback__comment--content {
    margin: 1rem 0rem;
    text-align: start;
    font-size: 15px;
    color: #647196;
    font-weight: 400;
    width: 100%;
  }
  .feedback__footer {
    width: 100%;
    height: 3rem;
  }
  .feedback__post {
    width: 100%;
    textarea {
      width: 90%;
      height: 4rem;
      padding-left: 2%;
      font-size: 15px;
      border-radius: 6px;
      border: solid 2px transparent;
      background-color: #f7f8fd;
      color: #4661e6;
    }
    textarea:hover,
    textarea:active,
    textarea:focus {
      border: solid 2px #4661e6;
      background-color: #f7f8fd;
      outline: none;
    }
    div {
      display: flex;
      height: 3rem;
      justify-content: space-between;
      button {
        margin-top: 0rem;
        padding: 0rem 1rem;
        height: 2.3rem;
        border-radius: 5px;
        outline: none;
        border: solid 1px transparent;
        text-transform: capitalize;
        font-weight: 600;
        color: #f2f4fe;
        background-color: #ad1fea;
        cursor: pointer;
        &:hover {
          background-color: #c75af6;
        }
      }
      h5 {
        color: #647196;
        font-size: 15px;
        font-weight: 600;
      }
    }
  }
}
@media screen and (min-width: 600px) and (max-width: 1100px) {
  .feedback__header {
    width: 95%;
    margin: 0rem auto;
    height: 3rem;
    padding-top: 3rem;
    text-transform: capitalize;
    text-align: start;
    display: flex;
    justify-content: space-between;
  }
  .feedback__buttons--edit--button {
    padding: 0px 12px;
    color: #f2f4fe;
    background-color: #4661e6;
    border-radius: 8px;
    border: solid 2px transparent;
    text-transform: capitalize;
    font-size: 14px;
    font-weight: bold;
    height: 2.5rem;
    margin-top: -0.9rem;
    cursor: pointer;
  }
  .feedback__section {
    width: 100%;
    margin: 1rem auto 2rem;
  }
  .feedback__comments {
    width: 95%;
    margin: 1rem auto 1rem;
    background-color: #fff;
    min-height: 4rem;
    border-radius: 8px;
  }
  .feedback__add__comments {
    width: 96%;
    margin: 2rem auto 0rem;
    background-color: #fff;
    min-height: 13rem;
    border-radius: 8px;
  }
  .feedback__container {
    width: 90%;
    margin: 2rem auto;
    h4 {
      word-spacing: 6px;
      text-align: start;
      line-height: 4rem;
      font-size: 14px;
      color: #3a4374;
      font-weight: bold;
      text-transform: capitalize;
    }
  }
  .feedback__comment {
    width: 100%;
    margin: 0.3rem 0rem;
  }
  .feedback__comment--head {
    display: flex;
    justify-content: space-between;
    height: 4rem;
    width: 100%;
    img {
      border-radius: 50%;
      width: 2.5rem;
      height: 2.5rem;
    }
    h2 {
      color: #4661e6;
      text-transform: capitalize;
      font-size: 13px;
      font-weight: 600;
    }
    div {
      width: 40rem;
      height: 3rem;
      h2 {
        width: 100%;
        text-align: start;
        display: flex;
        justify-content: flex-start;
        margin-bottom: -1.5rem;
        color: #3a4374;
        font-weight: bold;
        font-size: 14px;
      }
      h4 {
        width: 100%;
        text-align: start;
        display: flex;
        justify-content: flex-start;
        color: #647196;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
  .feedback__comment--content {
    margin: -1rem 0rem 2rem 6rem;
    text-align: start;
    min-height: 3rem;
    font-size: 15px;
    color: #647196;
    font-weight: 400;
  }
  .feedback__footer {
    width: 100%;
    height: 3rem;
  }
  .feedback__post {
    width: 100%;
    textarea {
      width: 100%;
      height: 4rem;
      padding-left: 2%;
      font-size: 15px;
      border-radius: 6px;
      border: solid 2px transparent;
      background-color: #f7f8fd;
      color: #4661e6;
    }
    textarea:hover,
    textarea:active,
    textarea:focus {
      border: solid 2px #4661e6;
      background-color: #f7f8fd;
      outline: none;
    }
    div {
      display: flex;
      height: 3rem;
      justify-content: space-between;
      button {
        margin-top: 0rem;
        padding: 0rem 1rem;
        height: 2.3rem;
        border-radius: 5px;
        outline: none;
        border: solid 1px transparent;
        text-transform: capitalize;
        font-weight: 600;
        color: #f2f4fe;
        background-color: #ad1fea;
        cursor: pointer;
        &:hover {
          background-color: #c75af6;
        }
      }
      h5 {
        color: #647196;
        font-size: 15px;
        font-weight: 600;
      }
    }
  }
}
@media screen and (min-width: 1100px) {
  .feedback__header {
    width: 70%;
    margin: 0rem auto;
    height: 3rem;
    padding-top: 3rem;
    text-transform: capitalize;
    text-align: start;
    display: flex;
    justify-content: space-between;
  }
  .feedback__buttons--edit--button {
    padding: 0px 12px;
    color: #f2f4fe;
    background-color: #4661e6;
    border-radius: 8px;
    border: solid 2px transparent;
    text-transform: capitalize;
    font-size: 14px;
    font-weight: bold;
    height: 2.5rem;
    margin-top: -0.9rem;
    cursor: pointer;
  }
  .feedback__section {
    width: 70%;
    margin: 1rem auto 2rem;
  }
  .feedback__comments {
    width: 70%;
    margin: 1rem auto 1rem;
    background-color: #fff;
    min-height: 4rem;
    border-radius: 8px;
  }
  .feedback__add__comments {
    width: 70%;
    margin: 2rem auto 0rem;
    background-color: #fff;
    min-height: 13rem;
    border-radius: 8px;
  }
  .feedback__container {
    width: 90%;
    margin: 2rem auto;
    h4 {
      word-spacing: 6px;
      text-align: start;
      line-height: 4rem;
      font-size: 14px;
      color: #3a4374;
      font-weight: bold;
      text-transform: capitalize;
    }
  }
  .feedback__comment {
    width: 100%;
    margin: 0.3rem 0rem;
  }
  .feedback__comment--head {
    display: flex;
    justify-content: space-between;
    height: 4rem;
    width: 100%;
    img {
      border-radius: 50%;
      width: 2.5rem;
      height: 2.5rem;
    }
    h2 {
      color: #4661e6;
      text-transform: capitalize;
      font-size: 13px;
      font-weight: 600;
    }
    div {
      width: 40rem;
      height: 3rem;
      h2 {
        width: 100%;
        text-align: start;
        display: flex;
        justify-content: flex-start;
        margin-bottom: -1.5rem;
        color: #3a4374;
        font-weight: bold;
        font-size: 14px;
      }
      h4 {
        width: 100%;
        text-align: start;
        display: flex;
        justify-content: flex-start;
        color: #647196;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
  .feedback__comment--content {
    margin: -1rem 0rem 2rem 6rem;
    text-align: start;
    min-height: 3rem;
    font-size: 15px;
    color: #647196;
    font-weight: 400;
  }
  .feedback__footer {
    width: 100%;
    height: 3rem;
  }
  .feedback__post {
    width: 100%;
    textarea {
      width: 100%;
      height: 4rem;
      padding-left: 2%;
      font-size: 15px;
      border-radius: 6px;
      border: solid 2px transparent;
      background-color: #f7f8fd;
      color: #4661e6;
    }
    textarea:hover,
    textarea:active,
    textarea:focus {
      border: solid 2px #4661e6;
      background-color: #f7f8fd;
      outline: none;
    }
    div {
      display: flex;
      height: 3rem;
      justify-content: space-between;
      button {
        margin-top: 0rem;
        padding: 0rem 1rem;
        height: 2.3rem;
        border-radius: 5px;
        outline: none;
        border: solid 1px transparent;
        text-transform: capitalize;
        font-weight: 600;
        color: #f2f4fe;
        background-color: #ad1fea;
        cursor: pointer;
        &:hover {
          background-color: #c75af6;
        }
      }
      h5 {
        color: #647196;
        font-size: 15px;
        font-weight: 600;
      }
    }
  }
}
</style>

<template>
  <main class="main">
    <section class="home__aside">
      <header class="main__header">
        <div>
          <h1>frontend mentor</h1>
          <h2>feedback board</h2>
        </div>
        <i
          :class="modal ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered'"
          @click="isModal"
        ></i>
      </header>
      <aside class="home__asid">
        <section class="main__nav">
          <button
            :class="categor.category === category ? 'active' : 'deactive'"
            v-for="categor in Categories"
            :key="categor.id"
            @click="SetCategory(categor.category)"
          >
            {{ categor.category }}
          </button>
        </section>
        <section class="main__nav">
          <div class="main__roadmap">
            <h1>roadmap</h1>
            <h3 @click="toRoute('/roadmap', 0)">view</h3>
          </div>
          <div class="main__container">
            <div class="home__roadmap--count">
              <span class="roadmap__design--planned"></span>
              <h3>planned</h3>
              <h2>{{ Planned.length }}</h2>
            </div>
            <div class="home__roadmap--count">
              <span class="roadmap__design--inprogress"></span>
              <h3>in progress</h3>
              <h2>{{ InProgress.length }}</h2>
            </div>
            <div class="home__roadmap--count">
              <span class="roadmap__design--live"></span>
              <h3>live</h3>
              <h2>{{ live.length }}</h2>
            </div>
          </div>
        </section>
      </aside>
    </section>
    <section class="home__main">
      <header class="home__header">
        <button
          class="home__addfeedback--button"
          @click="toRoute('/add-feedback', 0)"
        >
          <i class="fa-solid fa-plus"></i>
          add feedback
        </button>
      </header>
      <section>
        <article
          class="home__article"
          :key="state.id"
          v-for="state in Productrequest"
        >
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
          <div
            class="home__category"
            @click="
              router.push({
                path: `/feedback/${state.id}`,
              })
            "
          >
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
    </section>
    <aside :class="modal ? 'modal__overlay' : 'modal__none'">
      <div class="modal__empty" @click="isModal"></div>
      <div class="modal__contents">
        <aside class="modal__content">
          <section class="main__nav">
            <button
              :class="categor.category === category ? 'active' : 'deactive'"
              v-for="categor in Categories"
              :key="categor.id"
              @click="SetCategory(categor.category)"
            >
              {{ categor.category }}
            </button>
          </section>
          <section class="main__nav">
            <div class="main__roadmap">
              <h1>roadmap</h1>
              <h3 @click="toRoute('/roadmap', 0)">view</h3>
            </div>
            <div class="main__container">
              <div class="home__roadmap--count">
                <span class="roadmap__design--planned"></span>
                <h3>planned</h3>
                <h2>{{ Planned.length }}</h2>
              </div>
              <div class="home__roadmap--count">
                <span class="roadmap__design--inprogress"></span>
                <h3>in progress</h3>
                <h2>{{ InProgress.length }}</h2>
              </div>
              <div class="home__roadmap--count">
                <span class="roadmap__design--live"></span>
                <h3>live</h3>
                <h2>{{ live.length }}</h2>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </aside>
  </main>
</template>

<script>
import { ref, watchEffect } from "vue";
import createStore from "../store/index";
import { useRouter } from "vue-router";

const Store = createStore.state.Data.productRequests;
let category = ref("all");
let Productrequest = ref(Store);
let modal = ref(false);

watchEffect(() => {
  const Store = createStore.state.Data.productRequests;
  switch (category.value) {
    case "all":
      Productrequest.value = Store;
      break;
    case "enhancement":
      Productrequest.value = Store.filter(
        (state) => state.category === category.value
      );
      break;
    case "ui":
      Productrequest.value = Store.filter(
        (state) => state.category === category.value
      );
      break;
    case "ux":
      Productrequest.value = Store.filter(
        (state) => state.category === category.value
      );
      break;
    case "feature":
      Productrequest.value = Store.filter(
        (state) => state.category === category.value
      );
      break;
    case "bug":
      Productrequest.value = Store.filter(
        (state) => state.category === category.value
      );
  }
});
export default {
  name: "HomeView",
  setup() {
    const router = useRouter();
    const Store = createStore.state.Data.productRequests;
    const live = Store.filter((state) => state.status === "live");
    const InProgress = Store.filter((state) => state.status === "in-progress");
    const Planned = Store.filter((state) => state.status === "planned");
    return { router, live, InProgress, Planned, Store };
  },
  data() {
    return {
      Categories: [],
      Productrequest,
      category: category,
      modal,
    };
  },
  created() {
    this.Categories = [
      { id: 1, category: "all" },
      { id: 2, category: "ui" },
      { id: 3, category: "ux" },
      { id: 4, category: "feature" },
      { id: 5, category: "enhancement" },
      { id: 6, category: "bug" },
    ];
  },
  methods: {
    SetCategory(state) {
      category.value = state;
    },
    updateVote(id) {
      createStore.dispatch("updateVote", { id: id });
    },
    CommentsLength(num) {
      return Store.find((state) => state.id === num).comments.length;
    },
    toRoute(route, id) {
      if (id === 0) {
        this.$router.push(route);
      }
    },
    isModal() {
      modal.value = !modal.value;
    },
  },
  computed: {},
  components: {},
};
</script>

<style lang="scss">
* {
  padding: 0%;
  margin: 0%;
}
@media screen and (max-width: 600px) {
  .main {
    width: 100%;
    background-color: #f2f2f2;
  }
  .home__aside {
    width: 100%;
    display: flex;
    justify-content: space-around;
    height: 5rem;
    align-items: center;
  }
  .main__header {
    background-image: url("../assets/suggestions/desktop/background-header.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    div {
      h1,
      h2 {
        text-align: start;
        color: #fff;
        margin-left: 1rem;
        text-transform: capitalize;
      }
      h1 {
        border-top: 3.3rem solid transparent;
        margin-top: -2rem;
      }
      h2 {
        margin-top: -0rem;
        font-size: 15px;
        color: rgba(255, 255, 255, 0.833);
      }
    }
    i {
      color: #fff;
      margin: 2rem 1rem;
      font-size: 27px;
    }
  }
  .home__asid {
    display: none;
  }
  .main__nav {
    width: 13rem;
    height: 10.5rem;
    background-color: #fff;
    border-radius: 10px;
    padding-left: 0.4rem;
  }
  .main__nav .main__roadmap {
    display: flex;
    width: 85%;
    margin: auto;
    height: 2rem;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 18px;
      font-weight: bold;
      color: #3a4374;
      text-transform: capitalize;
    }
    h3 {
      color: #8397f8;
      font-size: 13px;
      font-family: 400;
      text-transform: capitalize;
      cursor: pointer;
    }
    h3:hover {
      text-decoration: underline;
      color: #8397f8;
    }
  }
  .main__nav .deactive:hover {
    color: #4661e6;
    background-color: #cfd7ff;
    cursor: pointer;
  }
  .main__nav .active {
    color: #fff;
    background: #4661e6;
    border: solid transparent 1px;
    border-radius: 6px;
    padding: 4px 10px;
    height: 1.7rem;
    margin: 0.5rem 0.4rem;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 17px;
    justify-content: flex-start;
    float: left;
  }
  .main__nav .deactive {
    float: left;
    background-color: #f2f4ff;
    color: #4661e6;
    border: solid transparent 1px;
    border-radius: 6px;
    padding: 4px 10px;
    height: 1.7rem;
    margin: 0.5rem 0.4rem;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 17px;
    justify-content: flex-start;
  }
  .home__main {
    width: 100%;
    margin: 0rem;
    min-height: 480vh;
  }
  .home__header {
    width: 100%;
    height: 5rem;
    background-color: #373f68;
    border-radius: 0px;
    margin: -0.01rem auto 2rem;
    display: flex;
    justify-content: flex-end;
    .home__addfeedback--button {
      padding: 3px 5px;
      border: solid 2px transparent;
      background-color: #ad1fea;
      color: #f2f4fe;
      font-size: 14px;
      font-weight: bold;
      font-family: jost;
      text-transform: capitalize;
      height: 2.5rem;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 1rem;
      margin-right: 1rem;
    }
  }
  .home__article {
    height: 15rem;
    width: 90%;
    background-color: #fff;
    border-radius: 7px;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
  }
  .home__votes {
    width: 100%;
    height: 100%;
    order: 2;
    .home__voted--deactive {
      height: 2.3rem;
      width: 6rem;
      margin: 1rem 5%;
      background-color: #f2f4fe;
      font-weight: 600;
      border-radius: 8px;
      display: flex;
      float: left;
      justify-content: space-around;
      i {
        margin-top: 0.6rem;
        font-weight: 800;
        color: #4661e6;
      }
      h3 {
        margin-top: 0.4rem;
        color: #3a4374;
      }
    }
    .home__voted--deactive:hover {
      background-color: #cfd7ff;
      cursor: pointer;
    }
    .home__voted--active {
      height: 2.3rem;
      width: 6rem;
      margin: 1rem auto;
      color: #f2f4fe;
      background-color: #4661e6;
      font-weight: 600;
      border-radius: 8px;
      display: flex;
      justify-content: space-around;
      cursor: pointer;
      i {
        margin-top: 0.6rem;
        font-weight: 600;
      }
      h3 {
        margin-top: 0.5rem;
      }
    }
  }
  .home__category {
    width: 90%;
    margin: auto;
    height: 100%;
    cursor: pointer;
    h2 {
      color: #3a4374;
      margin: 1rem 0rem 0.5rem;
      font-weight: 600;
      font-size: 18px;
      text-align: start;
    }
    h4 {
      color: #647196;
      font-size: 16;
      font-weight: 400;
      font-family: jost;
      text-align: start;
    }
    button {
      padding: 4px 16px;
      float: left;
      margin-top: 1.5rem;
      background-color: #f2f4ff;
      color: #4661e6;
      border-radius: 8px;
      border: solid transparent 4px;
      text-transform: capitalize;
      font-size: 13px;
      font-weight: 600;
    }
  }
  .home__comments {
    width: 40%;
    height: 100%;
    position: relative;
    order: 3;
    top: -5rem;
    left: 60%;
    &--content {
      width: 100%;
      margin-top: 30%;
    }
  }
  .home__roadmap--count {
    display: flex;
    justify-content: space-between;
    height: 1.8rem;
    h2 {
      font-size: 14px;
    }
    h3 {
      font-size: 15px;
      font-weight: bold;
      text-align: start;
      width: 9rem;
      text-transform: capitalize;
    }
    span {
      height: 0.3rem;
      width: 0.3rem;
      border-radius: 50%;
      margin-top: 0.4rem;
    }
    .roadmap__design--inprogress {
      background-color: #ad1fea;
    }
    .roadmap__design--planned {
      background-color: #f49f85;
    }
    .roadmap__design--live {
      background-color: #62bcfa;
    }
  }
  .main__container {
    width: 90%;
    margin: 1.3rem auto 0rem;
  }
  .modal__overlay {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 5rem;
    display: flex;
    animation: modalTransition 0.5s;
    .modal__empty {
      background-color: rgba(0, 0, 0, 0.78);
      width: 30%;
    }
    .modal__contents {
      width: 70%;
      background-color: #f2f4ff;
      animation: 0.75s modalDisplay ease-in-out;
    }
    .modal__content {
      width: 100%;
      height: 30rem;
      .main__nav {
        width: 13rem;
        height: 10.5rem;
        background-color: #fff;
        border-radius: 10px;
        padding-left: 0.4rem;
        margin: 2.5rem auto;
      }
    }
  }
  .modal__none {
    display: none;
  }
}
@media screen and (min-width: 600px) and (max-width: 1099px) {
  .main {
    width: 100%;
    background-color: #f2f2f2;
  }
  .home__aside {
    width: 100%;
    margin: 0rem;
    display: flex;
    justify-content: space-around;
    height: 15rem;
    align-items: center;
  }
  .main__header {
    background-image: url("../assets/suggestions/desktop/background-header.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 10px;
    width: 33%;
    height: 10.5rem;
    div {
      h1,
      h2 {
        text-align: start;
        color: #fff;
        margin-left: 1rem;
        text-transform: capitalize;
      }
      h1 {
        border-top: 6.3rem solid transparent;
      }
      h2 {
        font-size: 15px;
        color: rgba(255, 255, 255, 0.833);
      }
    }
    i {
      display: none;
    }
  }
  .home__asid {
    display: flex;
    justify-content: space-around;
    width: 60%;
  }
  .main__nav {
    width: 45%;
    height: 10.5rem;
    background-color: #fff;
    border-radius: 10px;
    padding-left: 0.4rem;
  }
  .main__nav .main__roadmap {
    display: flex;
    width: 85%;
    margin: auto;
    height: 2rem;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 18px;
      font-weight: bold;
      color: #3a4374;
      text-transform: capitalize;
    }
    h3 {
      color: #8397f8;
      font-size: 13px;
      font-family: 400;
      text-transform: capitalize;
      cursor: pointer;
    }
    h3:hover {
      text-decoration: underline;
      color: #8397f8;
    }
  }
  .main__nav .deactive:hover {
    color: #4661e6;
    background-color: #cfd7ff;
    cursor: pointer;
  }
  .main__nav .active {
    color: #fff;
    background: #4661e6;
    border: solid transparent 1px;
    border-radius: 6px;
    padding: 4px 10px;
    height: 1.7rem;
    margin: 0.5rem 0.4rem;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 17px;
    justify-content: flex-start;
    float: left;
  }
  .main__nav .deactive {
    float: left;
    background-color: #f2f4ff;
    color: #4661e6;
    border: solid transparent 1px;
    border-radius: 6px;
    padding: 4px 10px;
    height: 1.7rem;
    margin: 0.5rem 0.4rem;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 17px;
    justify-content: flex-start;
  }
  .home__main {
    width: 100%;
    margin: 0rem;
    min-height: 100vh;
  }
  .home__header {
    width: 95%;
    height: 5rem;
    background-color: #373f68;
    border-radius: 5px;
    margin: 1rem auto 2rem;
    display: flex;
    justify-content: flex-end;
    .home__addfeedback--button {
      padding: 3px 5px;
      border: solid 2px transparent;
      background-color: #ad1fea;
      color: #f2f4fe;
      font-size: 14px;
      font-weight: bold;
      font-family: jost;
      text-transform: capitalize;
      height: 2.5rem;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 1rem;
      margin-right: 1rem;
    }
  }
  .home__article {
    height: 9rem;
    width: 95%;
    background-color: #fff;
    border-radius: 7px;
    margin: 1rem auto;
    display: flex;
  }
  .home__votes {
    width: 15%;
    height: 100%;
    .home__voted--deactive {
      height: 4rem;
      width: 3rem;
      margin: 1rem auto;
      background-color: #f2f4fe;
      font-weight: 600;
      border-radius: 20%;
      align-content: space-around;
      i {
        margin-top: 0.5rem;
        color: #4661e6;
      }
      h3 {
        margin-top: 0.9rem;
        color: #3a4374;
      }
    }
    .home__voted--deactive:hover {
      background-color: #cfd7ff;
      cursor: pointer;
    }
    .home__voted--active {
      height: 4rem;
      width: 3rem;
      margin: 1rem auto;
      color: #f2f4fe;
      background-color: #4661e6;
      font-weight: 600;
      border-radius: 20%;
      align-content: space-between;
      cursor: pointer;
      i {
        margin-top: 0.5rem;
      }
      h3 {
        margin-top: 0.9rem;
      }
    }
  }
  .home__category {
    width: 65%;
    height: 100%;
    cursor: pointer;
    h2 {
      color: #3a4374;
      margin: 1rem 0rem 0.5rem;
      font-weight: 600;
      font-size: 18px;
      text-align: start;
    }
    h4 {
      color: #647196;
      font-size: 16;
      font-weight: 400;
      font-family: jost;
      text-align: start;
    }
    button {
      padding: 4px 16px;
      float: left;
      margin-top: 1.5rem;
      background-color: #f2f4ff;
      color: #4661e6;
      border-radius: 8px;
      border: solid transparent 4px;
      text-transform: capitalize;
      font-size: 13px;
      font-weight: 600;
    }
  }
  .home__comments {
    width: 20%;
    height: 100%;
    &--content {
      width: 100%;
      margin-top: 30%;
    }
  }
  .home__roadmap--count {
    display: flex;
    justify-content: space-between;
    height: 1.8rem;
    h2 {
      font-size: 14px;
    }
    h3 {
      font-size: 15px;
      font-weight: bold;
      text-align: start;
      width: 9rem;
      text-transform: capitalize;
    }
    span {
      height: 0.3rem;
      width: 0.3rem;
      border-radius: 50%;
      margin-top: 0.4rem;
    }
    .roadmap__design--inprogress {
      background-color: #ad1fea;
    }
    .roadmap__design--planned {
      background-color: #f49f85;
    }
    .roadmap__design--live {
      background-color: #62bcfa;
    }
  }
  .main__container {
    width: 90%;
    margin: 1.3rem auto 0rem;
  }
  .modal__overlay {
    display: none;
  }
  .modal__none {
    display: none;
  }
}
@media screen and (min-width: 1100px) {
  .main {
    width: 100%;
    background-color: #f2f2f2;
    display: flex;
    justify-content: center;
  }
  .home__aside {
    width: 25%;
    margin: 1rem 2rem 0rem;
  }
  .main__header {
    background-image: url("../assets/suggestions/desktop/background-header.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 10px;
    width: 15rem;
    height: 7rem;
    div {
      h1,
      h2 {
        text-align: start;
        color: #fff;
        margin-left: 2rem;
        text-transform: capitalize;
      }
      h1 {
        border-top: 3.3rem solid transparent;
      }
      h2 {
        font-size: 15px;
        color: rgba(255, 255, 255, 0.833);
      }
    }
    i {
      display: none;
    }
  }
  .main__nav {
    width: 15rem;
    margin-top: 3rem;
    height: 8.5rem;
    background-color: #fff;
    border-radius: 10px;
    padding-left: 1rem;
  }
  .main__nav .main__roadmap {
    display: flex;
    width: 90%;
    margin: auto;
    height: 2rem;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 18px;
      font-weight: bold;
      color: #3a4374;
      text-transform: capitalize;
    }
    h3 {
      color: #8397f8;
      font-size: 13px;
      font-family: 400;
      text-transform: capitalize;
      cursor: pointer;
    }
    h3:hover {
      text-decoration: underline;
      color: #8397f8;
    }
  }
  .main__nav .deactive:hover {
    color: #4661e6;
    background-color: #cfd7ff;
    cursor: pointer;
  }
  .main__nav .active {
    float: left;
    color: #fff;
    background: #4661e6;
    border: solid transparent 1px;
    border-radius: 6px;
    padding: 4px 10px;
    height: 1.7rem;
    margin: 0.5rem 0.4rem;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 17px;
    justify-content: flex-start;
  }
  .main__nav .deactive {
    float: left;
    background-color: #f2f4ff;
    color: #4661e6;
    border: solid transparent 1px;
    border-radius: 6px;
    padding: 4px 10px;
    height: 1.7rem;
    margin: 0.5rem 0.4rem;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 17px;
    justify-content: flex-start;
  }
  .home__main {
    width: 60%;
    margin: 0rem;
    min-height: 100vh;
  }
  .home__header {
    width: 100%;
    height: 5rem;
    background-color: #373f68;
    border-radius: 5px;
    margin: 1rem 0rem 2rem;
    display: flex;
    justify-content: flex-end;
    .home__addfeedback--button {
      padding: 3px 5px;
      border: solid 2px transparent;
      background-color: #ad1fea;
      color: #f2f4fe;
      font-size: 14px;
      font-weight: bold;
      font-family: jost;
      text-transform: capitalize;
      height: 2.5rem;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 1rem;
      margin-right: 1rem;
    }
  }
  .home__article {
    height: 9rem;
    width: 100%;
    background-color: #fff;
    border-radius: 7px;
    margin: 1rem 0rem;
    display: flex;
  }
  .home__votes {
    width: 15%;
    height: 100%;
    .home__voted--deactive {
      height: 4rem;
      width: 3rem;
      margin: 1rem auto;
      background-color: #f2f4fe;
      font-weight: 600;
      border-radius: 20%;
      align-content: space-around;
      i {
        margin-top: 0.5rem;
        color: #4661e6;
      }
      h3 {
        margin-top: 0.9rem;
        color: #3a4374;
      }
    }
    .home__voted--deactive:hover {
      background-color: #cfd7ff;
      cursor: pointer;
    }
    .home__voted--active {
      height: 4rem;
      width: 3rem;
      margin: 1rem auto;
      color: #f2f4fe;
      background-color: #4661e6;
      font-weight: 600;
      border-radius: 20%;
      align-content: space-between;
      cursor: pointer;
      i {
        margin-top: 0.5rem;
      }
      h3 {
        margin-top: 0.9rem;
      }
    }
  }
  .home__category {
    width: 65%;
    height: 100%;
    cursor: pointer;
    h2 {
      color: #3a4374;
      margin: 1rem 0rem 0.5rem;
      font-weight: 600;
      font-size: 18px;
      text-align: start;
    }
    h4 {
      color: #647196;
      font-size: 16;
      font-weight: 400;
      font-family: jost;
      text-align: start;
    }
    button {
      padding: 4px 16px;
      float: left;
      margin-top: 1.5rem;
      background-color: #f2f4ff;
      color: #4661e6;
      border-radius: 8px;
      border: solid transparent 4px;
      text-transform: capitalize;
      font-size: 13px;
      font-weight: 600;
    }
  }
  .home__comments {
    width: 20%;
    height: 100%;
    &--content {
      width: 100%;
      margin-top: 30%;
    }
  }
  .home__roadmap--count {
    display: flex;
    justify-content: space-between;
    height: 1.8rem;
    h2 {
      font-size: 14px;
    }
    h3 {
      font-size: 15px;
      font-weight: bold;
      text-align: start;
      width: 9rem;
      text-transform: capitalize;
    }
    span {
      height: 0.3rem;
      width: 0.3rem;
      border-radius: 50%;
      margin-top: 0.4rem;
    }
    .roadmap__design--inprogress {
      background-color: #ad1fea;
    }
    .roadmap__design--planned {
      background-color: #f49f85;
    }
    .roadmap__design--live {
      background-color: #62bcfa;
    }
  }
  .main__container {
    width: 90%;
    margin: 0.5rem auto 0rem;
  }
  .modal__overlay {
    display: none;
  }
  .modal__none {
    display: none;
  }
}
@keyframes modalTransition {
  from {
    opacity: 0%;
  }
  to {
    opacity: 100%;
  }
}
@keyframes modalDisplay {
  from {
    margin-left: 90%;
    width: 10%;
  }
  to {
    margin-left: 0%;
    width: 75%;
  }
}
</style>

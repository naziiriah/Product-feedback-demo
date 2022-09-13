<template>
  <div class="container">
    <header class="roadmap__header">
      <nav>
        <router-link to="/" class="roadmap__link">
          <i class="fa-solid fa-angle-left"></i>
          go back</router-link
        >
        <h2>roadmap</h2>
      </nav>
    </header>
    <main class="roadmap__main">
      <section class="roadmap__section">
        Planned ({{ Planned.length }})
        <div :key="state.id" class="roadmap__planned" v-for="state in Planned">
          <h4>{{ state.title }}</h4>
        </div>
      </section>
      <section class="roadmap__section">
        In-progress ({{ InProgress.length }})
        <div
          :key="state.id"
          class="roadmap__inprogress"
          v-for="state in InProgress"
        >
          <h4>{{ state.title }}</h4>
        </div>
      </section>
      <section class="roadmap__section">
        Live ({{ Live.length }})
        <div :key="state.id" class="roadmap__live" v-for="state in Live">
          <h4>{{ state.title }}</h4>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import createStore from "../store/index";

const Store = createStore.state.Data.productRequests;
const Live = Store.filter((state) => state.status === "live");
const InProgress = Store.filter((state) => state.status === "in-progress");
const Planned = Store.filter((state) => state.status === "planned");

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Roadmap",
  data() {
    return {
      Live,
      InProgress,
      Planned,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  background-color: #f2f2f2;
}
.roadmap__header {
  width: 80%;
  margin: 0rem auto 2rem;
  height: 6rem;
  background-color: #373f68;
  border-radius: 10px;
  nav {
    float: left;
    .roadmap__link {
      color: #fff;
      font-size: 20;
      font-weight: 400;
      text-transform: capitalize;
      text-align: start;
      float: left;
      text-decoration: none;
      cursor: pointer;
      margin-bottom: 0.3rem;
    }
    .roadmap__link:hover {
      text-decoration: underline;
    }
    h2 {
      color: #fff;
      font-size: 24;
      font-weight: bold;
      text-transform: capitalize;
    }
  }
}
.roadmap__main {
  width: 80%;
  margin: 0rem auto;
  display: flex;
  justify-content: space-between;
}
.roadmap__section {
  align-content: flex-start;
  width: 20rem;
}
.roadmap__live {
  height: 10rem;
  width: 90%;
  margin: 0rem auto 2rem;
  border-top: solid 5px #62bcfa;
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
  background-color: #fff;
}
.roadmap__planned {
  height: 10rem;
  width: 90%;
  margin: 0rem auto 2rem;
  border-top: solid 5px #f49f85;
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
  background-color: #fff;
}
.roadmap__inprogress {
  height: 10rem;
  width: 90%;
  margin: 0rem auto 2rem;
  border-top: solid 5px #ad1fea;
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
  background-color: #fff;
}
</style>

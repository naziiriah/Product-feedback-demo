<template>
  <div class="container">
    <header class="roadmap__header">
      <nav>
        <a @click="goBack" class="roadmap__link">
          <i class="fa-solid fa-angle-left"></i>
          go back</a
        >
        <h2>roadmap</h2>
      </nav>
    </header>
    <main class="roadmap__main">
      <section class="roadmap__section">
        <div class="roadmap__mini__title">
          <h2>Planned ({{ Planned.length }})</h2>
          <p>Ideas prioritized for research</p>
        </div>
        <div :key="state.id" class="roadmap__planned" v-for="state in Planned">
          <div class="roadmap__category__container">
            <div class="roadmap--count">
              <span class="roadmap__design--planned"></span>
              <h3>{{ state.status }}</h3>
            </div>
            <h3 class="roadmap__status__title">{{ state.title }}</h3>
            <p class="roadmap__status__details">{{ state.description }}</p>
            <button>{{ state.category }}</button>
            <div class="roadmap__comments__likes">
              <div
                :class="[
                  state.voted
                    ? 'roadmap__comments__upvotes__active'
                    : 'roadmap__comments__upvotes__deactive',
                ]"
                @click="updateVote(state.id)"
              >
                <i class="fa-solid fa-angle-up"></i>{{ state.upvotes }}
              </div>
              <div class="roadmap__comments--content">
                <i class="fa-regular fa-comment"></i>
                {{ CommentsLength(state.id) }}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="roadmap__section">
        <div class="roadmap__mini__title">
          <h2>In-progress ({{ InProgress.length }})</h2>
          <p>Currently being developed</p>
        </div>
        <div
          :key="state.id"
          class="roadmap__inprogress"
          v-for="state in InProgress"
        >
          <div class="roadmap__category__container">
            <div class="roadmap--count">
              <span class="roadmap__design--inprogress"></span>
              <h3>{{ state.status }}</h3>
            </div>
            <h3 class="roadmap__status__title">{{ state.title }}</h3>
            <p class="roadmap__status__details">{{ state.description }}</p>
            <button>{{ state.category }}</button>
            <div class="roadmap__comments__likes">
              <div
                :class="[
                  state.voted
                    ? 'roadmap__comments__upvotes__active'
                    : 'roadmap__comments__upvotes__deactive',
                ]"
                @click="updateVote(state.id)"
              >
                <i class="fa-solid fa-angle-up"></i>{{ state.upvotes }}
              </div>
              <div class="roadmap__comments--content">
                <i class="fa-regular fa-comment"></i>
                {{ CommentsLength(state.id) }}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="roadmap__section">
        <div class="roadmap__mini__title">
          <h2>Live ({{ Live.length }})</h2>
          <p>Released feature</p>
        </div>
        <div :key="state.id" class="roadmap__live" v-for="state in Live">
          <div class="roadmap__category__container">
            <div class="roadmap--count">
              <span class="roadmap__design--live"></span>
              <h3>{{ state.status }}</h3>
            </div>
            <h3 class="roadmap__status__title">{{ state.title }}</h3>
            <p class="roadmap__status__details">{{ state.description }}</p>
            <button>{{ state.category }}</button>
            <div class="roadmap__comments__likes">
              <div
                :class="[
                  state.voted
                    ? 'roadmap__comments__upvotes__active'
                    : 'roadmap__comments__upvotes__deactive',
                ]"
                @click="updateVote(state.id)"
              >
                <i class="fa-solid fa-angle-up"></i>{{ state.upvotes }}
              </div>
              <div class="roadmap__comments--content">
                <i class="fa-regular fa-comment"></i>
                {{ CommentsLength(state.id) }}
              </div>
            </div>
          </div>
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
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    CommentsLength(num) {
      return Store.find((state) => state.id === num).comments.length;
    },
    updateVote(id) {
      createStore.dispatch("updateVote", { id: id });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  background-color: #f2f2f2;
}
.roadmap__header {
  width: 90%;
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
  width: 90%;
  margin: 0rem auto;
  display: flex;
  justify-content: space-between;
}
.roadmap__section {
  align-content: flex-start;
  width: 20rem;
}
.roadmap__live {
  height: 15rem;
  width: 100%;
  margin: 0rem auto 2rem;
  border-top: solid 4px #62bcfa;
  border-top-left-radius: 2%;
  border-top-right-radius: 2%;
  background-color: #fff;
}
.roadmap__planned {
  height: 15rem;
  width: 100%;
  margin: 0rem auto 2rem;
  border-top: solid 4px #f49f85;
  border-top-left-radius: 2%;
  border-top-right-radius: 2%;
  background-color: #fff;
}
.roadmap__inprogress {
  height: 15rem;
  width: 100%;
  margin: 0rem auto 2rem;
  border-top: solid 4px #ad1fea;
  border-top-left-radius: 2%;
  border-top-right-radius: 2%;
  background-color: #fff;
}
.roadmap__mini__title {
  width: 100%;
  margin: auto;
  height: 5rem;
  text-align: start;
  h2 {
    color: #3a4374;
    font-size: 18px;
    line-height: 2rem;
    font-family: bold;
  }
  p {
    color: #647196;
    font-size: 16px;
  }
}
.roadmap__category__container {
  width: 90%;
  margin: 1rem auto 0rem;
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
.roadmap--count {
  display: flex;
  justify-content: flex-start;
  height: 1.8rem;
  span {
    height: 0.4rem;
    width: 0.4rem;
    border-radius: 50%;
    margin-top: 0.4rem;
  }
  h3 {
    text-transform: capitalize;
    font-size: 16px;
    color: #647196;
    font-weight: 500;
    margin-left: 0.5rem;
  }
  .roadmap__design--live {
    background-color: #62bcfa;
  }
  .roadmap__design--inprogress {
    background-color: #ad1fea;
  }
  .roadmap__design--planned {
    background-color: #f49f85;
  }
}
.roadmap__status__title {
  text-align: start;
  font-size: 18px;
  font-weight: bold;
  color: #3a4374;
  font-family: jost;
}
.roadmap__status__details {
  color: #647196;
  text-align: start;
  font-size: 15px;
  line-height: 20px;
  margin-top: 0.4rem;
}
.roadmap__comments__likes {
  height: 5rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 4.5rem;
}
.roadmap__comments__upvotes__deactive {
  width: 4rem;
  border: solid 3px transparent;
  padding-top: 0.5rem;
  height: 1.4rem;
  background-color: #f2f4fe;
  color: #3a4374;
  border-radius: 5px;
  display: flex;
  font-weight: bold;
  justify-content: space-around;
  i {
    color: #4661e6;
  }
}
.roadmap__comments__upvotes__active {
  width: 4rem;
  border: solid 3px transparent;
  padding-top: 0.5rem;
  height: 1.4rem;
  background-color: #4661e6;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  font-weight: bold;
}
</style>

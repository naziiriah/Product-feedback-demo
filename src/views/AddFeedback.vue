<template>
  <main class="container">
    <header class="add__header">
      <router-link to="/" class="add__link">
        <i class="fa-solid fa-angle-left"></i>
        go back</router-link
      >
    </header>
    <section class="add__section">
      <div class="add__design">
        <i class="fa-solid fa-plus"></i>
      </div>
      <div class="add__container--mini">
        <h4 class="add__title">create new feedback</h4>
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

          <div class="add__buttons">
            <button class="add__button--cancel">cancel</button>
            <button class="add__button--add" type="submit">add feedback</button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<script>
// @ is an alias to /src
import createStore from "../store/index";

export default {
  name: "AddFeedback",
  data() {
    return {
      title: "",
      category: "feature",
      description: "",
    };
  },
  methods: {
    OnSubmit() {
      const props = {
        id: Math.floor(Math.random() * 100),
        title: this.title,
        category: this.category,
        description: this.description,
        upvotes: 0,
        voted: false,
        status: "suggestion",
        comments: [],
      };
      createStore.dispatch("addFeedback", props);
      alert("successsful");
      this.$router.push("/");
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
.container {
  width: 100%;
  background-color: #f2f2f2;
  min-height: 100vh;
}
.add__header {
  width: 30%;
  margin: 0rem auto;
  height: 3rem;
  padding-top: 3rem;
  text-transform: capitalize;
  text-align: start;
}
.add__link {
  color: #647196;
  font-size: 14;
  font-weight: 600;
  text-transform: capitalize;
  text-align: start;
  float: left;
  text-decoration: none;
  cursor: pointer;
  margin-bottom: 0.3rem;
}
.add__link:hover {
  text-decoration: underline;
}
.add__section {
  width: 30%;
  height: 34rem;
  margin: 1rem auto 0rem;
  background-color: #fff;
  border-radius: 7px;
  border: solid transparent 1px;
}
.add__design {
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  background-image: url("../assets/suggestions/desktop/background-header.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  top: -2rem;
  left: 1rem;
  i {
    color: #fff;
    font-size: 26px;
    margin-top: 10px;
  }
}
.add__container--mini {
  width: 90%;
  margin: auto;
}
.add__title {
  color: #3a4374;
  font-size: 24px;
  font-family: jost;
  text-transform: capitalize;
  text-align: start;
}
form {
  width: 100%;
  height: 100%;
  div {
    width: 100%;
    margin: 1rem 0rem 1rem;
    input {
      margin: 0.5rem 0rem;
      width: 95%;
      height: 2.2rem;
      padding-left: 2%;
      font-size: 15px;
      border-radius: 6px;
      border: solid 2px transparent;
      background-color: #f7f8fd;
      color: #4661e6;
    }
    input:hover {
      border: solid 2px #4661e6;
      background-color: #f7f8fd;
    }
    input:active,
    input:focus {
      border: solid 2px #4661e6;
      outline: none;
      background-color: #f7f8fd;
    }
    select {
      width: 100%;
      border-radius: 6px;
      border: solid 2px transparent;
      background-color: #f7f8fd;
      color: #4661e6;
      height: 2.2rem;
      font-size: 15px;
      margin: 0.5rem 0rem;
      option {
        border-bottom: solid 1px red;
      }
    }
    select:hover,
    select:active,
    select:focus {
      border: solid 2px #4661e6;
      background-color: #f7f8fd;
      outline: none;
    }
    textarea {
      margin: 0.5rem 0rem;
      width: 95%;
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
  }
}

.add__label {
  width: 100%;
  text-transform: capitalize;
  text-align: start;
  float: left;
  font-size: 14px;
  color: #3a4374;
  font-weight: bold;
  line-height: 25px;
}
.add__desscription {
  text-align: start;
  float: left;
  font-size: 14px;
  color: #647196;
  font-weight: 400;
  line-height: 20px;
}
.add__buttons {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: flex-end;
  button {
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
  }
  .add__button--cancel {
    background-color: #3a4374;
  }
  .add__button--cancel:hover {
    background-color: #656ea3;
  }
  .add__button--add {
    background-color: #ad1fea;
  }
  .add__button--add:hover {
    background-color: #c75af6;
  }
}
</style>

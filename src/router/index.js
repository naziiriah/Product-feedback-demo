import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductFeedback from "../views/ProductFeedback.vue";
import AddFeedback from "../views/AddFeedback.vue";
import EditFeedback from "../views/EditFeedback.vue";
import Roadmap from "../views/Roadmap.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/product-feedback",
    name: "product",
    component: ProductFeedback,
  },
  {
    path: "/roadmap",
    name: "roadmap",
    component: Roadmap,
  },
  {
    path: "/add-feedback",
    name: "Add Feedback",
    component: AddFeedback,
  },
  {
    path: "/edit-feedback",
    name: "edit feedback",
    component: EditFeedback,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

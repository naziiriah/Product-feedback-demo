import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FeedbackDetail from "../views/FeedbackDetail.vue";
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
    path: "/feedback/:id",
    name: "FeedbackDetail",
    component: FeedbackDetail,
    props: true,
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
    path: "/edit-feedback/:id",
    name: "edit-feedback",
    component: EditFeedback,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

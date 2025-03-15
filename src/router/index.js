import { createRouter, createWebHistory } from "vue-router";

import UserManagement from "../views/UserManagement.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signin",
      name: "signin",
      component: SignIn,
      //hide header
      meta: { hideHeader: true },
    },
    {
      path: "/users",
      name: "users",
      component: UserManagement,
      //hide header
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
      //hide header
      meta: { hideHeader: true },
    },
  ],
});
router.beforeResolve(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: "signin", query: { redirect: to.fullPath } });
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next({ name: "main" });
  } else {
    return next();
  }
});

export default router;

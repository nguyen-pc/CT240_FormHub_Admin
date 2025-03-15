<template>
  <header>
    <div class="header-info">
      <h1 id="logoName">FORM HUB</h1>
      <div class="user-info">
        <span class="user-name">{{ user.user?.name || "Khách" }}</span>
        <div class="user-avatar"></div>
        <span @click="logout" v-if="isAuthenticated" class="cursor-pointer"
          ><img class="w-7 h-7" src="../assets/images/logout.png"
        /></span>
      </div>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const authStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();
    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const user = computed(() => authStore.userDetail);

    const path = route.path;

    const logout = async () => {
      await authStore
        .logout()
        .then(() => {
          localStorage.removeItem("breadcrumbPath");
          router.replace({ name: "signin" });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      user,
      isAuthenticated,
      logout,
    };
  },
};
</script>

<style scoped>
.header-info {
  margin-left: 60px;
  width: 90%;
  display: flex;
  justify-content: space-between;
}

.direction {
  border-radius: 10px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
  padding: 5px;
  display: flex;
}
.direction .form-option {
  border-radius: 50px;
}
.form {
  margin: 15px;
  color: white;
  font-size: 20px;
}
.form:hover {
  color: pink;
}
#logoName {
  color: blue;
}

.user-info {
  display: flex;
  align-items: center;
  font-size: 20px;
}

.user-name {
  color: black;
}

.user-avatar {
  width: 30px;
  height: 30px;
  background: red;
  border-radius: 50%;
}
.w-7 {
  width: 20px;
  height: 20px;
}
</style>

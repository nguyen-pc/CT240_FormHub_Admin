<template>
  <Form @submit="submitForm">
    <div class="form-group">
      <Field
        name="username"
        type="text"
        class="form-control"
        placeholder="Nhập tên đăng nhập"
      />
    </div>

    <div class="form-group">
      <Field
        name="password"
        type="password"
        class="form-control"
        placeholder="Nhập mật khẩu"
      />
    </div>

    <div class="form-group">
      <button class="btn_login">Đăng nhập</button>
    </div>
  </Form>
</template>

<script>
import { Form, Field } from "vee-validate"; // Đảm bảo import đúng
import { useAuthStore } from "@/stores/auth";
export default {
  components: {
    Form,
    Field,
  },
  data() {},
  methods: {
    async submitForm(values) {
      const authStore = useAuthStore();

      await authStore
        .login(values)
        .then(() => {
          this.$router.replace({ name: "users" });
        })
        .catch((err) => {
          alert("Bạn không có quyền truy cập");
          console.log(err);
        });
      // Xử lý khi form được submit, values chứa các giá trị từ các trường
      console.log(values);
    },
  },
};
</script>

<style>
.form-group {
  margin-bottom: 15px;
}

.form-group input {
  width: 90%;
  height: 25px;
  padding: 8px;
  font-size: 10px;
}

.btn_login {
  width: 200px;
  height: 40px;
  border: 2px solid #fff;
  border-radius: 20px;
  background: transparent;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: 0.3s;
}

.btn_login:hover {
  background: white;
  color: #6f5fe2;
}
.form-control {
  border-radius: 10px;
  width: 80%;
}
</style>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { format } from 'date-fns'; // Import date-fns

export default {
  setup() {
    const users = ref([]);
    const newUser = ref({ name: '', email: '', password: '' });
    const editingUser = ref(null); // Lưu thông tin người dùng đang chỉnh sửa

    // Gọi API để lấy danh sách người dùng khi component được tải
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users');
        users.value = response.data; // Gán danh sách người dùng vào biến users
      } catch (error) {
        console.error('Lỗi khi tải danh sách người dùng:', error);
      }
    };

    // Gọi API thêm người dùng
    const addUser = async () => {
      if (!newUser.value.name || !newUser.value.email || !newUser.value.password) return;
      try {
        await axios.post('http://localhost:8080/users', newUser.value);
        fetchUsers(); // Tải lại danh sách sau khi thêm
        newUser.value = { name: '', email: '', password: '' };
      } catch (error) {
        console.error('Lỗi khi thêm người dùng:', error);
      }
    };

    // Gọi API xóa người dùng
    const deleteUser = async (id) => {
      const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?");
      if (!confirmDelete) return; // Nếu người dùng nhấn "Cancel" thì dừng lại

      try {
        await axios.delete(`http://localhost:8080/users/${id}`);
        fetchUsers(); // Tải lại danh sách sau khi xóa
      } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
      }
    };

    // Gọi API sửa người dùng
    const updateUser = async () => {
      if (!editingUser.value.name || !editingUser.value.email || !editingUser.value.password) return;
      try {
        await axios.put(`http://localhost:8080/users/${editingUser.value.id}`, editingUser.value);
        fetchUsers(); // Tải lại danh sách sau khi sửa
        editingUser.value = null; // Reset lại sau khi chỉnh sửa
      } catch (error) {
        console.error('Lỗi khi sửa người dùng:', error);
      }
    };

    // Gọi API khi component được tải
    onMounted(fetchUsers);

    // Cập nhật thông tin người dùng đang chỉnh sửa
    const startEditing = (user) => {
      editingUser.value = { ...user }; // Lưu lại thông tin người dùng vào biến đang chỉnh sửa
    };

    // Định dạng ngày cho dễ nhìn
    const formatDate = (date) => {
      return format(new Date(date), 'dd/MM/yyyy HH:mm'); // Định dạng ngày tháng năm và giờ phút
    };

    return { users, newUser, editingUser, addUser, deleteUser, updateUser, startEditing, formatDate };
  },
};
</script>

<template>
  <div class="container">
    <h1>Quản Lý Người Dùng</h1>

    <!-- Form để thêm người dùng -->
    <div class="form-container">
      <input v-model="newUser.name" placeholder="Tên" />
      <input v-model="newUser.email" placeholder="Email" />
      <input v-model="newUser.password" type="password" placeholder="Mật khẩu" />
      <button @click="addUser" class="btn-add">Thêm</button>
    </div>

    <!-- Form để sửa người dùng -->
    <div v-if="editingUser" class="form-container">
      <h3>Sửa Người Dùng</h3>
      <input v-model="editingUser.name" placeholder="Tên" />
      <input v-model="editingUser.email" placeholder="Email" />
      <input v-model="editingUser.password" type="password" placeholder="Mật khẩu" />
      <button @click="updateUser" class="btn-update">Cập Nhật</button>
      <button @click="editingUser = null" class="btn-cancel">Hủy</button>
    </div>

    <!-- Danh sách người dùng -->
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên</th>
          <th>Email</th>
          <th>Ngày Tạo</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ formatDate(user.createdAt) }}</td> <!-- Định dạng ngày ở đây -->
          <td>
            <!-- Nút sửa -->
            <button @click="startEditing(user)" class="btn-edit">Sửa</button>
            <!-- Nút xóa -->
            
            <button @click="deleteUser(user.id)" class="btn-delete">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Tạo không gian cho giao diện */
.container {
  
  width: 90vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #2196F3;
  border-radius: 10px;
  background-image: url("../assets/artistic-blurry-colorful-wallpaper-background_58702-8196.jpg");
  background-size: cover;
}
main{
  background-color: #f44336;
}
/* Phần form thêm và sửa người dùng */
.form-container {
  margin-bottom: 10px;
  justify-self: center;
}
h1{
  justify-self: center;
  color: white;
  margin: 20px;
  font-weight: 700;
}
.form-container input {
  padding: 8px;
  margin-right: 10px;
  width: 20vw;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.form-container button {
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.btn-add {
  background-color: green;
  color: white;
}

.btn-update {
  background-color: #2196F3;
  color: white;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
}

.btn-edit, .btn-delete {
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-edit {
  background-color: #2196F3;
  color: white;
  margin-right: 5px;
}

.btn-delete {
  background-color: red;
  color: white;
}

/* Định dạng bảng */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  color: black;
  border-radius: 10px;
}

th, td {
  padding: 12px;
  text-align: left;
  border: 1px solid black;
  
}

th {
  background-color: rgba(117, 113, 113, 0.538);
  font-weight: 500;
}

td {
  background-color: rgba(255, 255, 255, 0.729);
}

td button {
  margin: 5px;
}
</style>

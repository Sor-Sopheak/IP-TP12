<template>
  <div class="wrapper">
    <div class="header">
      <h1>Admin dashboard</h1>
      <h1>លេខមួយ.com</h1>
    </div>
    <div id="page-wrap">
      <div class="grid-wrap-left">
        <div>
          <router-link to="/dashboard/category">
            <p>Category</p>
          </router-link>

          <router-link to="/dashboard/item">
            <p>Item</p>
          </router-link>

          <router-link to="/dashboard/product">
            <p>Product</p>
          </router-link>
        </div>
      </div>

      <div class="right-page">
        <router-view></router-view>
      </div>
    </div>

    <div class="logout" @click="onLogout">
      <router-link :to="{ name: 'login' }">Logout</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: "AdminDashboard",
  
  async mounted() {},

  methods: {
    onLogout() {
      localStorage.removeItem('token');
      this.$router.push('auth/login');
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.wrapper {
  margin: auto;
  width: 90%;
  min-height: 100vh;
  overflow-y: auto;
  border: 2px solid gray;
  display: flex;
  flex-direction: column;
}

#page-wrap {
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  text-align: center;
  flex-grow: 1;
}

.grid-wrap-left {
  background-color: #f0f0f0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 2px gray solid;
  height: 50px;
}

.logout {
  width: 75px;
  height: 30px;
  border: 2px solid #aaaaaa;
  align-self: flex-start;
  margin: 10px;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
}

.logout:hover{
  background: #2691d9;
  border: none;
  color: #f0f0f0;
}

</style>

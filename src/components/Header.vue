
<template>
  <div class="navbar">
    <div class="items">
      <div class="app">
        <img src="../assets/icons/sidebar.svg" alt="" class="cursor-pointer" />
        <div class="logo">CantineApp</div>
      </div>
      <div class="auth-info">
        <img
          class="avatar"
          :src="store.user.image"
          alt=""
        />
        <div class="auth">
          <h4 class="mb-0">{{ store.user.fullname }}</h4>
          <span>  {{ store.user.role }}</span>
        </div>
        <span  @click="logout" class="text-white cursor-pointer">Logout</span>
      </div>
    </div>
  </div>
</template>




<script>
import { useLoginStore } from '@/stores/login';
export default {
  data() {
    return {
      store: useLoginStore(),
      user : []
    }
  },
  methods :{
    logout(){
      this.store.logout();
    }
  }
};
</script>



<style scoped>
.navbar {
  width: 100%;
  height: 80px;
  background-color: #f15959;
  color: white;
}
.navbar .items {
  width: 90%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 20px;
}

.app {
  display: flex;
  align-items: center;
  gap: 40px;
}

.auth-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar {
  height: 60px;
  width: 60px;
  border-radius: 50%;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
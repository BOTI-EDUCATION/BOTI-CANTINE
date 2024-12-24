
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
        <span  @click="logout" class="text-white cursor-pointer logout-cta"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 224c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"/></svg></span>
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
  padding: 15px 25px;
  /* height: 80px; */
  background-color: #f15959;
  color: white;
}
.navbar .items {
  /* width: 90%; */
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

.auth h4{
  margin: 0px;
}

.logout-cta{
  height: 30px;
  width: 30px;
}
</style>
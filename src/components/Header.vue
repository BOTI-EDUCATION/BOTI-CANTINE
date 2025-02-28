
<template>
  <div class="nav">
    <!-- SIDEBAR -->
    <div class="navbar">
      <div class="items">
        <div class="app">
          <img
            @click="openNav()"
            src="../assets/icons/sidebar.svg"
            alt=""
            class="cursor-pointer"
          />
          <div class="logo">ShopApp</div>
        </div>
        <div class="auth-info">
          <img class="avatar" :src="store.user.image" alt="" />
          <div class="auth">
            <h4 class="mb-0">{{ store.user.fullname }}</h4>
            <span> {{ store.user.role }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- SIDEBAR -->
    <div id="mySidenav" class="sidenav">
      <div class="logo-school">
        <img :src="store.school.logo" />
      </div>
      <a href="javascript:void(0)" class="closebtn" @click="closeNav()"
        >&times;</a
      >
      <RouterLink to="/transactions"> Men transactions </RouterLink>

      <a @click="openModal()">Changer mot de passe</a>
      <a @click="logout">Se déconnecter</a>
    </div>
  </div>

  <!-- MODAL -->
  <div class="boti-modal d-none" id="boti-modal">
    <div class="boti-modal-content">
      <div class="boti-flex-center-between mb-3">
        <h4 class="text-blue-dark">Changer mot de passe</h4>
        <a class="cursor-pointer fs-16" @click="closeModal()">&times;</a>
      </div>
      <div class="mb-3" style="margin-top: 30px !important">
        <label class="fs-14 d-block mb-1"> Mot de passe actuelle : </label>
        <input
          v-model="pass.actuelle"
          type="password"
          class="inu-style w-100"
        />
      </div>
      <div class="mb-3">
        <label class="fs-14 d-block mb-1"> Nouveau mot de passe : </label>
        <input v-model="pass.new" type="password" class="inu-style w-100" />
      </div>
      <div class="mb-3">
        <label class="fs-14 d-block mb-1"
          >Mot de passe de confirmation :
        </label>
        <input v-model="pass.conf" type="password" class="inu-style w-100" />
      </div>
      <div v-if="store.errorPass" class="mb-3">
        <span class="text-danger fs-14">{{ store.errorPass }}</span>
      </div>
      <button class="act w-100 mt-2 fs-14" @click="changePass">
        Changer le mot de passe
      </button>
    </div>
  </div>
</template>




<script>
import { useLoginStore } from "@/stores/login";

export default {
  data() {
    return {
      store: useLoginStore(),
      user: [],
      pass: {
        actuelle: "",
        new: "",
        conf: "",
      },
    };
  },
  methods: {
    logout() {
      this.store.logout();
    },
    changePass() {
      this.store.changePass(this.pass);
    },
    openNav() {
      document.getElementById("mySidenav").style.width = "250px";
    },
    closeNav() {
      document.getElementById("mySidenav").style.width = "0";
    },
    openModal() {
      this.pass.actuelle = "";
      this.pass.new = "";
      this.pass.conf = "";
      this.store.openModal();
    },
    closeModal() {
      this.store.closeModal();
    },
  },
};



window.onclick = function(event) {
  if (event.target ==   document.querySelector("#boti-modal")) {
    document.querySelector("#boti-modal").classList.add('d-none');
  }
}
</script>




<style scoped>
.logo-school {
  height: 70px;
  width: 80%;
  margin: auto;
}

.logo-school img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.act {
  border-radius: 40px !important;
  outline: none;
  border: none;
  background: #2b2a64 !important;
  color: white !important;
  padding: 15px 25px !important;
  cursor: pointer;
  -webkit-border-radius: 40px !important;
  -moz-border-radius: 40px !important;
  -ms-border-radius: 40px !important;
  -o-border-radius: 40px !important;
}

.boti-modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.boti-modal-content {
  width: 500px;
  height: 450px;
  background: white;
  padding: 20px;
  border-radius: 20px;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
.inu-style {
  border: 1px solid #d2d2d2;

  background-color: white;
  height: 50px;
  border-radius: 20px;
  outline: none;
  padding-left: 15px;
}

.sidenav {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);

  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: white; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */
.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 14px;
  color: black;
  display: block;
  transition: 0.3s;
  cursor: pointer;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover:not(.closebtn) {
  color: white;
  background: #f15959;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
  transition: margin-left 0.5s;
  padding: 20px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}

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

.auth h4 {
  margin: 0px;
}

.logout-cta {
  height: 30px;
  width: 30px;
}
</style>
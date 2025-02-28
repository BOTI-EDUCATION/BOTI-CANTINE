<template>
  <div class="bg">
    <div class="card-login">
      <div class="left-side">
        <div class="contents">
          <div class="logo">
            <!-- <img src="@/assets/icons/log.svg" alt="" srcset="" /> -->
             <!-- <img src="https://static.vecteezy.com/system/resources/previews/009/418/828/non_2x/shop-marketing-3d-icon-illustration-for-your-website-user-interface-and-presentation-3d-render-illustration-free-png.png" alt="" srcset=""> -->
              <p style="font-size: 38px;color:#f15959"> <b>ShopApp</b> </p>
          </div>

          <div class="send-request">
            <div class="input-style">
              <img src="@/assets/icons/login.svg" alt="" />
              <input
                type="text"
                placeholder="Adresse email"
                v-model="login.email"
              />
            </div>
            <div class="input-style">
              <img src="@/assets/icons/password.svg" alt="" />
              <input
                type="password"
                placeholder="Mot de passe"
                v-model="login.password"
              />
            </div>

            <!-- <div class="text-right">
              <a href="" class="rember">Mot de passe oublié ?</a>
            </div> -->
            <div class="text-right" v-if="store.error">
              <span class="text-danger fs-14">{{ store.error }}</span>
            </div>
            <button class="login-btn" @click="auth">Se connecter</button>
          </div>
        </div>
      </div>
      <div class="right-side">
        <img src="../../assets/bgs/water.png" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>


<script>
import { useLoginStore } from "@/stores/login";
export default {
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      store: useLoginStore(),
    };
  },
  methods: {
    auth() {
      this.store.login(this.login);
    },
  },

};
</script>


<style scoped>
.bg {
  background-image: url("../../assets/bgs/background.jpg");
  background-color: #fafafb;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.card-login {
  background-color: #ffffff;
  display: flex;
  width: 80%;
  height: 650px;
  border-radius: 8px;
}

.card-login .left-side {
  width: 60%;
}

.left-side .contents {
  width: 70%;
  margin: auto;
  height: 80%;
  position: relative;
}

.contents .logo {
  margin: 40px 0px 80px;
  text-align: center;
}

.card-login .right-side {
  width: 40%;
  height: 100%;
  /* background-image: url("./../../assets/bgs/water.png");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover; */
}
.card-login .right-side img {
  width: 100%;
  height: 100%;
  background-size: cover;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.input-style {
  /* width: calc(100% - 50px); */
  background: #f4f4f4;
  padding: 16px 25px;
  margin-bottom: 20px;
  border-radius: 16px;
  display: flex;
  gap: 15px;
}

input {
  border: none;
  outline: none;
  color: #12122c;
  width: 100%;
  background: transparent;
  font-weight: 500;
}
input::placeholder {
  color: #12122c;
}

.login-btn {
  width: 100%;
  border: none;
  outline: none;
  background: #f15959;
  border-radius: 30px;
  padding: 20px;
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: 500;
  position: absolute;
  bottom: 0;
}

.login-btn:hover {
  background: white;
  color: #f15959;
  border: 1px solid #f15959;
  font-weight: bold;
}

.rember {
  color: #12122c;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
}
@media (max-width: 900px) {
  .card-login .left-side {
    width: 100%;
  }
  .card-login .right-side {
    display: none;
  }
}
</style>
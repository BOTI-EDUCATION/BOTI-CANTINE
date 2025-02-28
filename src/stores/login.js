import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";
import { inject, ref, watch } from "vue";
import Swal from "sweetalert2";

export const useLoginStore = defineStore("login", () => {
  const user = ref([]);
  const school = ref([]);
  const token = ref("");
  const error = ref("");
  const errorPass = ref("");
  const alias = inject("$alias");
  const modalPassword = ref(false);

  let ses_token = localStorage.getItem("boticantine_token_" + alias);

  watch(token, (newval, oldval) => {
    axios.defaults.headers.common["Authorization"] = newval
      ? `Bearer ${newval}`
      : undefined;
    if (newval) {
      localStorage.setItem("boticantine_token_" + alias, newval);
      getUser();
    } else {
      localStorage.removeItem("boticantine_token_" + alias);
    }
  });

  if (ses_token) {
    token.value = ses_token;
  }

  // const url =  '/auth';
  const router = useRouter();
  const login = async (request) => {
    let formData = new FormData();
    formData.append("email", request.email);
    formData.append("password", request.password);
    await axios
      .post(`auth/login`, formData)
      .then((res) => {
        error.value = "";
        token.value = res.data.token;
        user.value = res.data.user;
        router.push({ path: "/" });
      })
      .catch((err) => {
        error.value = err.response.data.msg;
      });
  };

  const getUser = async (request) => {
    await axios
      .get(`auth/getUser`)
      .then((res) => {
        console.log(res);
        user.value = res.data.user;
        school.value = res.data.school;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changePass = async (request) => {
    if (!request.new || !request.conf) {
      errorPass.value = "Les champs sont obligatoires !";
    } else if (request.new.length < 6) {
      errorPass.value = "Le mot de passe doit contenir au moins 6 caractères !";
    } else if (request.new != request.conf) {
      errorPass.value = "Les 2 mots de passe sont différents";
    } else {
      let formData = new FormData();
      formData.append("old_pass", request.actuelle);
      formData.append("new_pass", request.new);
      formData.append("user", user.value.id);
      formData.append("email", user.value.email);
      await axios
        .post(`auth/changePassword`, formData)
        .then((res) => {
          errorPass.value = "";
          closeModal();
          Swal.fire({
            title: "Le changement du mot de passe a été fait avec succés",
            icon: "success",
          });
        })
        .catch((err) => {
          errorPass.value = "Mot de passe est incorrect !";
        });
    }
  };

  const logout = async () => {
    token.value = "";
    user.value = null;
    router.push({ path: "/login" });
  };

  const openModal = () => {
    errorPass.value = "";
    // modalPassword.value = true;
    document.querySelector("#boti-modal").classList.remove('d-none')
  };
  const closeModal = () => {
    errorPass.value = "";
    // modalPassword.value = false;
    document.querySelector("#boti-modal").classList.add('d-none')
  };

  return {
    user,
    token,
    error,
    errorPass,
    modalPassword,
    school,
    login,
    logout,
    changePass,
    closeModal,
    openModal,
  };
});

import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from "vue-router";


export const useLoginStore = defineStore('login', {
    state: () => ({ 
       user: [],
       token:'',
       url: 'https://boti.education/p/demo/cantineapi/auth',
       router: useRouter(),

      }),
    actions: {
      async login(request) {
        let formData = new FormData();
        formData.append("email", request.email);
        formData.append("password", request.password);
        await axios
          .post(`${this.url}/login`, formData)
          .then((res) => {
            this.token = res.data.token;
            this.user = res.data.user;
            localStorage.setItem('token',this.token);
            this.router.push({path:'/'});
          })
          .catch((err) => {
            console.log(err);
          });
      },
      async logout(){
        this.token = null;
        this.user = null;
        localStorage.removeItem("token");
        localStorage.clear();
        this.router.push({path:'/login'});

      }
    }
})

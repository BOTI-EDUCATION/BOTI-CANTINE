import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from "vue-router";
import { inject, ref, watch } from 'vue';


export const useLoginStore = defineStore('login', () => {
  const user =  ref([]);
  const token =  ref('');
  const alias = inject('$alias')
  
  console.log('=================AuthIndex===================');
  console.log('boticantine_token_'+alias);
  console.log('====================================');

  let ses_token = localStorage.getItem('boticantine_token_'+alias);

  watch(
    token,(newval,oldval)=>{
      console.log('=================token===================');
      console.log('token',newval,oldval);
      console.log('====================================');
      axios.defaults.headers.common['Authorization'] = (newval?`Bearer ${newval}`:undefined);
      if(newval){
        localStorage.setItem('boticantine_token_'+alias,newval);
        getUser()
      }else{
        localStorage.removeItem('boticantine_token_'+alias);
      }
    }
  )

  if(ses_token){
    token.value = ses_token;
  }

  // const url =  '/auth';
  const router =  useRouter();
  const login = async(request)=>{
    let formData = new FormData();
    formData.append("email", request.email);
    formData.append("password", request.password);
    await axios
      .post(`auth/login`, formData)
      .then((res) => {
        token.value = res.data.token;
        user.value = res.data.user;
        router.push({path:'/'});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUser = async(request)=>{
    await axios
      .get(`auth/getUser`)
      .then((res) => {
        user.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = async ()=>{
    token.value = '';
    user.value = null;
    // localStorage.clear();
    router.push({path:'/login'});

  }
  return { 
    user,
    token,
    login,
    logout,

  }
})
// export const useLoginStore = defineStore('login', {
//     state: () => ({ 
//        user: [],
//        token: localStorage.getItem('boticantine_token_'+alias)||'',
//        url: 'https://boti.education/p/demo/cantineapi/auth',
//        router: useRouter(),
//       }),
//     actions: {
//       async login(request) {
//         let formData = new FormData();
//         formData.append("email", request.email);
//         formData.append("password", request.password);
//         await axios
//           .post(`${this.url}/login`, formData)
//           .then((res) => {
//             this.token = res.data.token;
//             this.user = res.data.user;
//             localStorage.setItem('boticantine_token_'+alias,this.token);

//             this.router.push({path:'/'});
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       },
//       async logout(){
//         this.token = null;
//         this.user = null;
//         localStorage.removeItem("token");
//         localStorage.clear();
//         this.router.push({path:'/login'});

//       }
//     },
// })



<template>
  <RouterView />


  <!-- <header>
     <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

</template>



<script>
// import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
import axios from "axios";
import Product from "./components/cards/product.vue";
import Swal from "sweetalert2";

let url = "https://boti.education/p/demo/boticantine";

export default {
  components: {
    Header,
    Product,
  },
  data() {
    return {
      products: [],
      rubriques: [],
      products_ids: [],
      productsOrigine: [],
      products_shoped: [],
      products_shoped_ids: [],
      total: 0,
      searchProduct: "",
      secondStep: false,
      searchedEleve: "",
      resultSearchedEleve: [],
      step: 1,
      originEleves: [],
      eleves: [],
    };
  },
  methods: {
    async getProducts() {
      await axios
        .get(url + "/getProducts")
        .then((res) => {
          console.log(res.data);

          this.products = res.data.products;
          this.productsOrigine = res.data.products;
          this.products_ids = res.data.ids;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getRubriques() {
      await axios
        .get(url + "/rubriques")
        .then((res) => {
          this.rubriques = res.data.rubriques;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // * ABOUT SHOPPING CART
    addToCart(product) {
      product.qte += 1;
      product.calc = Number(product.qte) * Number(product.prix);
      this.total += Number(product.prix);
      this.addActiveClasse(product.id);
      if (this.products_shoped_ids.length == 0) {
        this.products_shoped_ids.push(product.id);
        this.products_shoped.push(product);
      } else {
        if (!this.products_shoped_ids.includes(product.id)) {
          this.products_shoped_ids.push(product.id);
          this.products_shoped.push(product);
        }
      }

      console.log(this.products_shoped);
    },
    removeFromCart(product) {
      this.total -= product.calc;
      product.qte = 0;
      this.removeActiveClasse(product.id);
      this.products_shoped = this.products_shoped.filter(
        (item) => item.id != product.id
      );
      this.products_shoped_ids = this.products_shoped_ids.filter(
        (item) => item != product.id
      );
    },
    addActiveClasse(id) {
      let card = document.querySelector(`#pro-${id}`);
      card.classList.add("purple-border");
      // let lineshow = document.querySelector(`#line-${id}`);
      // let sale = document.querySelector(`#cart-${id}`);
      // let input = document.querySelector(`#qte_inp-${id}`);
      // input.focus();
      // input.value = 1;
      // card.style.height = "437px";
      // lineshow.classList.remove("d-none");
      // sale.classList.add("d-none");
    },
    removeActiveClasse(id) {
      let card = document.querySelector(`#pro-${id}`);
      card.classList.remove("purple-border");
      // let lineshow = document.querySelector(`#line-${id}`);
      // let input = document.querySelector(`#qte_inp-${id}`);
      // let sale = document.querySelector(`#cart-${id}`);

      // input.value = 0;
      // lineshow.classList.add("d-none");
      // sale.classList.remove("d-none");
    },
    reduceQte(product) {
      product.qte -= 1;
      product.calc = Number(product.qte) * Number(product.prix);
      this.total -= Number(product.prix);
      if (product.qte == 0) {
        this.removeActiveClasse(product.id);
        this.removeFromCart(product);
      }
    },
    addQte(product) {
      product.qte += 1;
      product.calc = Number(product.qte) * Number(product.prix);
      this.total += Number(product.prix);
      // document.querySelector(`#qte_inp-${product.id}`).value = product.qte;
    },
    // * ABOUT  RUBRIQUE
    filterRubrique(type, idx) {
      if (type == "all") {
        this.products = this.productsOrigine;
        document.querySelector("#rub-all").classList.add("active");
        this.removeActive();
      } else {
        this.activeRubrique(idx),
          (this.products = this.productsOrigine.filter((pro) => {
            return pro.rubrique_id == type;
          }));
      }
    },
    activeRubrique(idx) {
      for (let i = 0; i < this.rubriques.length; i++) {
        let elm = document.querySelector(`#rub-${i}`);
        idx == i ? elm.classList.add("active") : elm.classList.remove("active");
      }
      document.querySelector("#rub-all").classList.remove("active");
    },
    removeActive() {
      for (let i = 0; i < this.rubriques.length; i++) {
        document.querySelector(`#rub-${i}`).classList.remove("active");
      }
    },
    // * ABOUT  ELEVE
    async searchEleve() {
      console.log(this.searchedEleve);
      let search = this.searchedEleve.replace(" ", "_");
      console.log(search);
      await axios
        .get(`${url}/getEleves/${search}`)
        .then((res) => {
          this.eleves = res.data.eleves;
          this.originEleves = res.data.eleves;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chooseEleve(eleve) {
      if (this.eleves.length > 1) {
        this.eleves = this.eleves.filter((item) => {
          return item.eleve == eleve.eleve;
        });
      }
    },
    removeEleve(id) {
      this.eleves = this.eleves.filter((elm) => {
        return elm.eleve != id;
      });
    },
    // * ABOUT CONSOMMATION
    async validateConsommation(eleve) {
      let formData = new FormData();
      formData.append("wallet", eleve.wallet);
      formData.append("total", this.total);
      formData.append("user", 1);

      // let qte = [];
      // let products = [];
      // let price = [];
      // let totalPrice = [];
      this.products_shoped.map((elm) => {
        // qte.push(elm.qte);
        // products.push(elm.id);
        // price.push(elm.prix);
        // totalPrice.push(elm.calc);

        formData.append("products[]", elm.id);
        formData.append("qte[]", elm.qte);
        formData.append("pu[]", elm.prix);
        formData.append("total_price[]", elm.calc);
      });

      
      await axios
        // .post('https://boti.education/ncsm/api/save-ticket-from-school', formData)
        .post(`${url}/consommation_wallet`, formData)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });

      Swal.fire({
        title: "Transaction validée",
        // text: "Votre demande est communiqué au service CUSTOMER SUCCESS. Votre chargé de compte est bien notifié.",
        icon: "success",
      });
    },
  },
  mounted() {
    // this.getProducts();
    // this.getRubriques();
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.w-app {
  width: 90%;
  margin: auto;
}
</style>



<template>
  <Header></Header>

  <div class="w-app">
    <!-- step  1 -->
    <template v-if="step == 1">
      <div class="search">
        <input
          type="text"
          placeholder="Rechercher par nom ou code de produit"
          v-on:input="filterProducts($event)"
        />
      </div>
      <div
        class="count-pro text-blue-dark fs-18 boti-flex boti-align-center gap-10"
        style="margin-top: 20px; margin-bottom: 20px"
      >
        <span class="text-pink font-bold"> {{ products.length }} </span>
        Produits :

        <!-- filter rubrique -->
        <div class="boti-flex gap-10">
          <button
            class="btn-light active"
            @click="filterRubrique('all', 'all')"
            id="rub-all"
          >
            All
          </button>
          <button
            class="btn-light"
            v-for="(rubrique, idx) in rubriques"
            :key="rubrique.id"
            @click="filterRubrique(rubrique.id, idx)"
            :id="`rub-${idx}`"
          >
            {{ rubrique.label }}
          </button>
        </div>
      </div>

      <div class="section-products">
        <!---------------- PRODUCT LIST ---------------->
        <div class="products boti-grid-250">
          <div
            class="card-borne"
            v-for="product in products"
            :key="product.id"
            :id="`pro-${product.id}`"
            @click="addToCart(product)"
          >
            <!-- <div
              style="
                margin-right: 12px;
                margin-top: 5px;
                margin-bottom: -8px;
                text-align: right;
              "
            ></div> -->
            <!-- Image product -->
            <div class="img">
              <img :src="product.image" alt="" srcset="" />
            </div>
            <!-- details -->
            <div class="text-center mt-2 w-90 mx-auto">
              <h4 class="text-blue-dark font-bold mb-1 product-label">
                {{ product.label }}
              </h4>

              <div
                style="margin-top: 14px"
                class="boti-bg-light-blue tag-boti font-bold fs-18 w-100"
              >
                {{ product.formated_prix }} Dh
              </div>
            </div>

            <div></div>
          </div>
        </div>

        <!---------------- CHOOSED PRODUCT ---------------->
        <div class="toshop">
          <template v-if="products_shoped.length > 0">
            <h4 class="text-blue-dark" style="margin-top: 0px;margin-bottom: 20px">
              <span class="text-pink font-bold">{{
                products_shoped.length
              }}</span>
              Articles sélectionnés
            </h4>

            <!-- new design -->

            <div
              class="card w-100"
              v-for="product in products_shoped"
              :key="product.id"
            >
              <div class="shoped-product">
                <div class="image">
                  <img :src="product.image" alt="" srcset="" />
                </div>
                <div class="label">
                  <p>
                    {{ product.label }} <br>
                    <span class="text-purple">
                      {{ product.prix }}<small>Dh</small>
                    </span>
                    X
                    <span
                      class="font-bold"
                      style="color: #f15959; font-size: 16px"
                      >{{ product.qte }}</span
                    >
                  </p>
                  <div class="price-pos">
                    <span class="price">{{
                      product.calc.toLocaleString("en")
                    }}</span>
                    <span class="text-purple font-bold">Dh</span>
                  </div>
                </div>

                <button
                  class="trash-button"
                  v-on:click="removeFromCart(product)"
                >
                  <img src="../assets/icons/trash.svg" width="100%" />
                </button>

              </div>

              <!-- buttons qte -->
              <div class="qte-buttons">
                <button class="btn-style-qte" v-on:click="reduceQte(product)">
                  <img src="../assets/icons/minece.svg" alt="" />
                </button>
                <button class="btn-style-qte" v-on:click="addQte(product)">
                  <img src="../assets/icons/plus.svg" alt="" />
                </button>
              </div>
            </div>

            <div class="total">
              <p>Total</p>
              <span> {{ total }} <small>Dh</small></span>
            </div>
            <button class="validate" @click="step = 2">Valider</button>
          </template>
          <div v-else class="text-center" style="padding-top: 40px">
            <img src="../assets/icons/empty.svg" width="50%" />
            <p class="black">Aucun Article sélectionné</p>
          </div>
        </div>
      </div>
    </template>

    <!-- step 2  -->
    <template v-else-if="step == 2">
      <div class="secondeStep">
        <div class="secondeStepNav text-left">
          <a @click="step = 1" href="javascript:void(0);"><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 11.1962L1 6.09808L7 1" stroke="#9F9F9F" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>&nbsp;&nbsp;&nbsp;Retour</a>
        </div>
        <!-- <h2 class="text-blue-dark">Scanner le Qr code</h2> -->

        <!---------- TOTAL PRICE COMMANDE ------------>
        <div
          class="card-eleve boti-flex boti-align-center"
          style="border: 1px solid #c7c7c7"
        >
          <div>
            <svg
              width="90"
              height="99"
              viewBox="0 0 106 99"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="106" height="99" rx="17" fill="#FFF5F5" />
              <path
                d="M21.3846 44.353V61.4643C21.3846 71.1455 21.3846 75.9826 24.4576 78.9896C27.5376 82 32.4831 82 42.3846 82H63.3846C73.2825 82 78.2315 82 81.308 78.9896C84.3845 75.9826 84.3845 71.1421 84.3845 61.4643V44.353M63.3846 66.5783C60.9906 68.6547 57.1791 69.9992 52.8846 69.9992C48.5901 69.9992 44.7786 68.6547 42.3846 66.5783M46.3641 37.244C45.3771 40.7299 41.7861 46.7405 34.9681 47.6094C28.9481 48.3791 24.3771 45.81 23.2116 44.7358C21.9271 43.8635 18.9941 41.0754 18.2766 39.3376C17.5591 37.593 18.3956 33.8197 18.9941 32.2803L21.3846 25.5138C21.9691 23.8136 23.3376 19.794 24.7376 18.4325C26.1376 17.071 28.9726 17.0128 30.1416 17.0128H54.6626C60.9731 17.1018 74.7735 16.9581 77.5 17.0128C80.23 17.0676 81.868 19.3048 82.3475 20.2627C86.418 29.8959 88 35.4173 88 37.764C87.468 40.275 85.27 45.0026 77.5 47.086C69.4255 49.248 64.8476 45.0403 63.4126 43.4256M43.0426 43.4256C44.1801 44.7905 47.7466 47.5375 52.9126 47.6059C58.0821 47.6744 62.5446 44.1508 64.13 42.3822C64.578 41.8588 65.5476 40.3092 66.5555 37.2406"
                stroke="#F15959"
                stroke-width="5.46341"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="text-center flex-1 text-blue-dark">
            <p class="font-bold" style="font-size: 40px; margin-bottom: 0">
              {{ total
              }}<small class="font-bold" style="font-size: 25px">Dh</small>
            </p>
            <span style="color: #6d6d6d">Total Commande</span>
          </div>
        </div>
        <!-----------------------  SEARCH ELEVE ----------------------->
        <form @submit.prevent="searchEleve">
          <div class="search-eleve">
            <input
              type="text"
              id="search_eleve"
              placeholder="CNE, Nom complet"
              v-model="searchedEleve"
            />
            <button class="light-btn" >Rechercher</button>
          </div>
        </form>
        <!----------------------- RESULT ELEVE ----------------------->
        <div
          v-for="eleve in eleves"
          :key="eleve.id"
          class="card-eleve text-right"
          :class="{ cardEleveSelected: eleves.length == 1 }"
          @click="chooseEleve(eleve)"
        >
          <button
            v-if="eleves.length == 1"
            class="circle-sm boti-danger remove-eleve-btn"
            @click="removeEleve(eleve.eleve)"
          >
            <img src="../assets/icons/cancel.svg" alt="" />
          </button>
          <div class="boti-flex-center-between">
            <div class="boti-flex-center-between gap-25">
              <figure>
                <img :src="eleve.image" alt="" />
              </figure>
              <div class="text-blue-dark text-left">
                <h2 class="mb-8 font-bold text-blue-dark">
                  {{ eleve.fullname }}
                </h2>
                <p class="mb-8 text-blue-dark fs-15" v-if="eleve.classe">
                  {{ eleve.classe }}
                </p>
                <p class="mb-8 text-blue-dark fs-15" v-if="eleve.cne">
                  CNE : {{ eleve.cne }}
                </p>
              </div>
            </div>
            <div class="text-center">
              <p class="mb-6 text-blue-dark fs-16">Solde</p>
              <p
                v-if="eleves.length >= 1 && eleve.solde > 0"
                class="mb-6 green-color font-bold fs-25"
              >
                {{ eleve.solde }} <span class="font-light">Dh</span>
              </p>
              <p
                v-else-if="eleves.length >= 1 && eleve.solde == 0"
                class="mb-6 warning-color font-bold fs-14"
              >
                0 <span class="font-light">Dh</span>
              </p>
              <a
                v-if="eleve.hasTransaction"
                class="capsule boti-flex boti-align-center gap-10 boti-bg-purple"
              >
                <img src="../assets/icons/transaction.svg" alt="" />

                Transaction

                <img src="../assets/icons/chevron-right.svg" alt="" />
              </a>
            </div>
          </div>
        </div>

        <div
          v-if="
            eleves.length == 1 &&
            (eleves[0].solde <= 0 || eleves[0].solde < total)
          "
          class="bg-light-orange card-item mt-25 boti-flex-center-center gap-10"
        >
          <img src="../assets/icons/noSolde.svg" alt="" />
          <span class="font-bold fs-16">Solde insuffisant</span>
        </div>

        <button
          class="validate mt-25"
          v-if="
            eleves.length == 1 &&
            (eleves[0].solde > 0 || eleves[0].solde >= total)
          "
          @click="validateConsommation(eleves[0])"
        >
          Valider
        </button>
        <button
          class="no-validate mt-25"
          disabled
          v-if="
            eleves.length == 1 &&
            (eleves[0].solde <= 0 || eleves[0].solde < total)
          "
        >
          Valider
        </button>
      </div>
    </template>
    <!-- step 3  -->
    <template v-else-if="step == 3"> </template>
  </div>
</template>
  
  
  
  <script>
// import { RouterLink, RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import axios from "axios";
import Swal from "sweetalert2";

// let url = "https://boti.education/p/demo/boticantine";

export default {
  components: {
    Header,
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
        .get("products/getProducts")
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
        .get("products/getRubriques")
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
    },
    removeActiveClasse(id) {
      let card = document.querySelector(`#pro-${id}`);
      card.classList.remove("purple-border");
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
        .get(`eleves/getEleves/${search}`)
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
      this.searchEleve();
      // this.eleves = this.eleves.filter((elm) => {
      //   return elm.eleve != id;
      // });
    },
    // * ABOUT CONSOMMATION
    async validateConsommation(eleve) {
      let formData = new FormData();
      formData.append("wallet", eleve.wallet);
      formData.append("total", this.total);
      formData.append("user", 1);

      this.products_shoped.map((elm) => {
        formData.append("products[]", elm.id);
        formData.append("qte[]", elm.qte);
        formData.append("pu[]", elm.prix);
        formData.append("total_price[]", elm.calc);
      });

      await axios
        // .post('https://boti.education/ncsm/api/save-ticket-from-school', formData)
        .post(`eleves/consommation_wallet`, formData)
        .then((res) => {

          this.products_shoped = [];
          this.products_shoped_ids = [];
          this.eleves = [];
          this.total = 0;
          this.products.map((product)=>{
            product.qte = 0;
            return product;
          })
            Swal.fire({
              title: "Transaction validée",
              // text: "Votre demande est communiqué au service CUSTOMER SUCCESS. Votre chargé de compte est bien notifié.",
              icon: "success",
            });
        })
        .catch((err) => {
          
          Swal.fire({
              title: "Une erreure s'est produite",
              // text: "Votre demande est communiqué au service CUSTOMER SUCCESS. Votre chargé de compte est bien notifié.",
              icon: "danger",
            });
        }).finally(()=>{
          this.step = 1;
        });

    },
    filterProducts(event) {
      this.products = this.productsOrigine;
      let target = event.target.value;
      if (target) {
        target = target.toLowerCase();
        this.products = this.products.filter((item) => {
          return (
            item.label.toLowerCase().includes(target) ||
            item.barcode.toLowerCase().includes(target)
          );
        });
      } else this.products = this.productsOrigine;
    },
  },
  mounted() {
    this.getProducts();
    this.getRubriques();
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
  
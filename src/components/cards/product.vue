<template>
    <div class="card-borne"            :id="`pro-${product.id}`"
    >
  <div
    style="
      margin-right: 12px;
      margin-top: 5px;
      margin-bottom: -8px;
      text-align: right;
    "
  >
    <a
      :id="`cart-${product.id}`"
      class="text-right"
      v-on:click="addToCart(product)"
    >
      <!-- <img src="./assets/icons/cart.svg" width="12%" /> -->
    </a>
  </div>
  <!-- Image product -->
  <div class="img">
    <img :src="product.image" alt="" srcset="" />
  </div>
  <!-- details -->
  <div class="text-center mt-2 w-90 mx-auto">
    <h4 class="text-blue-dark font-bold mb-1">{{ product.label }}</h4>
    <span
      class="border-purple-light text-purple-light d-in-bl boti-badge-capsule padding-badge font-light"
    >
      {{ product.rubrique }}
    </span>
    <div
      style="margin-top: 14px"
      class="boti-bg-light-blue tag-boti font-bold fs-18 w-100"
    >
      {{ product.formated_prix }} Dh
    </div>
  </div>
  <!-- line -->
  <div class="line"></div>
  <!-- qr code -->
  <div class="barcode">
    <!-- <img src="<?php echo URL::base() . 'assets/images/barcode.png' ?>" alt="" srcset=""> -->
  </div>
  <div class="text-center">
    <span style="letter-spacing: 6px">
      {{ product.barcode }}
    </span>
  </div>

  <!-- FOR QTE -->
  <div class="line d-none" :id="`line-${product.id}`">
    <div class="qte">
      <button class="btn-style-qte" v-on:click="reduceQte(product)">
        <svg
          width="19"
          height="3"
          viewBox="0 0 19 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.18433 1.5H17.8159"
            stroke="#5F5C6B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <input
        type="number"
        class="inu_qte"
        min="1"
        readonly
        :id="`qte_inp-${product.id}`"
      />
      <button class="btn-style-qte" v-on:click="addQte(product)">
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 1.5V15.5M1.5 8.5H15.5"
            stroke="#5F5C6B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
  <div></div>
</div>
</template>


<script>
export default {
    props: ['product'],

  data() {
    return {
      products: [],
      products_ids: [],
      productsOrigine: [],
      products_shoped: [],
      products_shoped_ids: [],
      total: 0,
      searchProduct: "",
      secondStep: false,
      searchedEleve: "",
      resultSearchedEleve: [],
    };
  },
  methods: {
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
      let lineshow = document.querySelector(`#line-${id}`);
      let input = document.querySelector(`#qte_inp-${id}`);
      let sale = document.querySelector(`#cart-${id}`);
      input.focus();
      input.value = 1;
      card.classList.add("purple-border");
      card.style.height = "437px";
      lineshow.classList.remove("d-none");
      sale.classList.add("d-none");
    },
    removeActiveClasse(id) {
      let card = document.querySelector(`#pro-${id}`);
      let lineshow = document.querySelector(`#line-${id}`);
      let input = document.querySelector(`#qte_inp-${id}`);
      let sale = document.querySelector(`#cart-${id}`);

      input.value = 0;
      card.classList.remove("purple-border");
      lineshow.classList.add("d-none");
      sale.classList.remove("d-none");
    },
    reduceQte(product) {
      product.qte -= 1;
      product.calc = Number(product.qte) * Number(product.prix);
      this.total -= Number(product.prix);
      document.querySelector(`#qte_inp-${product.id}`).value = product.qte;
      if (product.qte == 0) {
        this.removeActiveClasse(product.id);
        this.removeFromCart(product);
      }
    },
    addQte(product) {
      product.qte += 1;
      product.calc = Number(product.qte) * Number(product.prix);
      this.total += Number(product.prix);
      document.querySelector(`#qte_inp-${product.id}`).value = product.qte;
    },
  },

};
</script>



<style>
</style>
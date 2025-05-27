<template>
  <Header></Header>
  <div class="secondeStepNav text-left" style="margin-left: 6%">
    <RouterLink to="/">
      <svg
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 11.1962L1 6.09808L7 1"
          stroke="#9F9F9F"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      &nbsp;&nbsp;&nbsp; Retour
    </RouterLink>
  </div>
  <div class="secondeStep">
    <h4 class="text-left">Transactions</h4>

    <div class="mt-25 boti-flex gap-10 boti-justify-end">
      <div class="input-search">
        <!-- <VueDatePicker v-model="date" autoRange="true"></VueDatePicker> -->
        <VueDatePicker @change="filterDay()" id="auto" v-model="date" range />
      </div>

      <div class="input-search">
        <svg
          width="21"
          height="22"
          viewBox="0 0 21 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.625 17.125C13.491 17.125 16.625 13.991 16.625 10.125C16.625 6.25901 13.491 3.125 9.625 3.125C5.75901 3.125 2.625 6.25901 2.625 10.125C2.625 13.991 5.75901 17.125 9.625 17.125Z"
            stroke="#B2B2B2"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.3751 18.8751L14.5688 15.0688"
            stroke="#B2B2B2"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <input
          type="text"
          @keyup="searchProduit($event)"
          placeholder="Recherche par élève "
        />
      </div>
    </div>

    <!-- items -->
    <div class="mt-25">
      <div
        class="card-item light-bg b-gray boti-flex boti-align-center boti-between radius-10 mb-20"
        v-for="(item, idx) in transactions"
        :key="idx"
      >
        <div class="w-65 boti-flex boti-align-center boti-between">
          <div class="text-left">
            <template v-if="item.details.length > 0">
              <p
                style="margin-top: 4px"
                class="text-blue-dark font-bold text-left fs-16 mb-0"
                v-for="detail in item.details"
                :key="detail.id"
              >
                {{ detail.product }}
                <span v-if="detail.qte > 1">{{ detail.qte }}x - </span>
                {{ detail.price ? detail.price + "dh" : "" }}
              </p>
            </template>
            <span class="text-gray fs-15 text-left"> {{ item.date }}</span>
          </div>
          <span class="text-blue-dark font-bold fs-25">
            {{ item.montant }} dh</span
          >
        </div>
        <svg
          width="2"
          height="63"
          viewBox="0 0 2 63"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 0V62.5" stroke="#C6C6C6" />
        </svg>
        <button class="btn-style font-bold" :class="`bg-${item.colors.classe}`">
          {{ item.state }}
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import Header from "../components/Header.vue";
import axios from "axios";
import { useLoginStore } from "@/stores/login";

export default {
  components: {
    Header,
  },
  data() {
    return {
      original_data: [],
      transactions: [],
      date: "",
      store: useLoginStore(),
    };
  },
  methods: {
    searchProduit(event) {
      let target = event.target.value.toLowerCase();
      let searched = [];
      if (target) {
        this.original_data.map((item) => {
          if (item.details.length > 0) {
            item.details.filter((det) => {
              if (det.product.toLowerCase().includes(target)) {
                searched.push(item);
                this.transactions = searched;
              }
            });
          }
        });
      } else this.transactions = this.original_data;
    },
    filterperiode(start, end) {
      this.transactions = this.original_data.filter((item) => {
        if (item.date >= start && item.date <= end) {
          return item;
        }
      });
    },
    async getTrans() {
      await axios
        .get(`transactions/user`)
        .then((res) => {
          this.transactions = res.data.transactions;
          this.original_data = res.data.transactions;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addZero(value) {      
      return String(value).length == 1 ? `0${value}` : value;
    },
  },
  watch: {
    date(newVal) {
      let start = new Date(newVal[0]);
      let end = new Date(newVal[1]);
      start = `${this.addZero(start.getDate())}-${
        this.addZero(start.getMonth() + 1)  
      }-${start.getFullYear()}`;
      end = `${this.addZero(end.getDate())}-${this.addZero(end.getMonth() + 1)}-${end.getFullYear()}`;
      console.log(start, end);
      this.filterperiode(start, end);
    },
  },
  mounted() {
    this.getTrans();
    const startDate = new Date();
    const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
    this.date = [startDate, endDate];
  },
};
</script>

<style scoped>
.secondeStep {
  height: 100vh;
  width: 50vw;
  margin: auto;
  text-align: center;
}
</style>
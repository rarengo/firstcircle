<template>
  <div>
    <h1>First Circle Computer Store</h1>
    <Checkout />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Checkout from './Checkout.vue';

export default defineComponent({
  name: 'App',
  components: {
    Checkout,
  },
});
</script>
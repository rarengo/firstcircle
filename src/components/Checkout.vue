<template>
  <div>
    <div>
      <h3>Scan Items</h3>
      <v-select
        v-model="selectedProduct"
        :items="productOptions"
        label="Product"
        item-text="text"
        item-value="value"
        outlined
      ></v-select>
      <v-btn @click="scanItem" color="primary">Scan</v-btn>
    </div>

    <div v-if="scannedItems.length > 0">
      <h3>Scanned Items</h3>
      <v-list>
        <v-list-item v-for="(item, index) in scannedItems" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ formatCurrency(item.price) }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="removeItem(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </div>

    <div v-if="scannedItems.length > 0">
      <h3>Total</h3>
      <div>{{ formatCurrency(calculateTotal()) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { products, pricingRules } from '../data';

export default defineComponent({
  name: 'Checkout',
  data() {
    return {
      selectedProduct: null,
      scannedItems: [] as { sku: string; name: string; price: number }[],
      productOptions: products.map((product) => ({
        text: product.name,
        value: product.sku,
      })),
    };
  },
  methods: {
    scanItem() {
      const product = products.find((p) => p.sku === this.selectedProduct);
      if (product) {
        this.scannedItems.push(product);
      }
    },
    removeItem(index: number) {
      this.scannedItems.splice(index, 1);
    },
    calculateTotal() {
      const itemCounts: { [key: string]: number } = {};
      let total = 0;
      let vgaAdapterCount = 0;

      

      for (const item of this.scannedItems) {
        if (item.sku in itemCounts) {
          itemCounts[item.sku]++;
        } else {
          itemCounts[item.sku] = 1;
        }
      }

      

      for (const item of this.scannedItems) {
        const pricingRule = pricingRules[item.sku];

        if (pricingRule && itemCounts[item.sku] >= pricingRule.quantity) {
          if (item.sku === 'atv' && pricingRule.quantity === 3) {
            // 3-for-2 deal on Apple TVs
            const discountedCount = Math.floor(itemCounts[item.sku] / 3) * 2;
            total += discountedCount * item.price;
            itemCounts[item.sku] -= discountedCount;
          } else if (item.sku === 'ipd' && pricingRule.quantity > 4) {
            // Bulk discount for Super iPad
            const bulkDiscountPrice = pricingRule.bulkDiscountPrice || item.price;
            total += itemCounts[item.sku] * bulkDiscountPrice;
            itemCounts[item.sku] = 0;
          } else {
            total += item.price;
          }
        } else {
          total += item.price;
        }

        if (item.sku === 'mbp') {
          // Bundle free VGA adapter with MacBook Pro
          vgaAdapterCount++;
        }
      }

      // Deduct the cost of bundled VGA adapters
      const vgaAdapterPrice = pricingRules['vga']?.discountPrice || 0;
      total -= vgaAdapterCount * vgaAdapterPrice;

      return total;
    },
    formatCurrency(amount: number) {
      return '$' + amount.toFixed(2);
    },
  },
});
</script>

<style>
/* Add Vuetify styling as needed */
</style>

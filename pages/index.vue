<template>
  <div>
    <CategoryFilter :categories="categories" @filter="filterCategory" />
    <ProductGrid :products="filteredProducts" />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const products = await $axios.$get('/products');
    const categories = await $axios.$get('/products/categories');
    return { products, categories };
  },
  data() {
    return {
      filteredProducts: this.products
    };
  },
  methods: {
    filterCategory(category) {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }
}
</script>

<template>
  <div>
    <ProductCard
      :products="products"
      :selectedCategory="selectedCategory"
      @add-to-cart="addToCart"
    />
    <CartPopup
      :cart="cart"
      @remove-item="removeItem"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ProductCard from '~/components/ProductCard.vue';
import CartPopup from '~/components/CartPopup.vue';

export default {
  components: {
    ProductCard,
    CartPopup
  },
  data() {
    return {
      products: [],
      categories: ['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"],
      selectedCategory: 'all',
      cart: []
    };
  },
  methods: {
    fetchProducts() {
      axios
        .get('https://fakestoreapi.com/products')
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    filterCategory(category) {
      this.selectedCategory = category;
    },
    addToCart(product) {
      this.cart.push(product);
    },
    removeItem(product) {
      this.cart = this.cart.filter(item => item.id !== product.id);
    }
  },
  mounted() {
    this.fetchProducts();
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  },
  watch: {
    cart: {
      handler(newCart) {
        localStorage.setItem('cart', JSON.stringify(newCart));
      },
      deep: true
    }
  }
};
</script>

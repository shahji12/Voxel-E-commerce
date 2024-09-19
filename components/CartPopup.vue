<template>
  <transition name="slide">
    <div v-if="isCartVisible" class="cart-popup">
      <div class="cart-header">
        <h2>Your Cart ({{ cartItems.length }})</h2>
        <button class="close-btn" @click="toggleCart">×</button>
      </div>
      <ul class="cart-items">
        <li v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="pro-img">
            <img :src="item.image" alt="Product Image" class="cart-item-image" />
          </div>
          <div class="cart-item-details">
            <p class="cart-item-title">{{ item.title }}</p>
            <div class="inline">
              <p class="cart-item-price">${{ item.price }}</p>
              <button @click="removeItem(item)" class="remove-item-btn">Remove</button>
            </div>
          </div>
        </li>
      </ul>
      <div class="cart-footer">
        <div class="cart-total">
          <p><span>Total:</span> ${{ totalPrice }}</p>
        </div>
        <button class="checkout-btn">Continue to Checkout</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isCartVisible: {
      type: Boolean
    },
    cart: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      cartItems: []
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + item.price, 0);
    }
  },
  methods: {
    toggleCart() {
      this.$emit('close'); // Emit close event
    },
    removeItem(item) {
      const index = this.cartItems.indexOf(item);
      if (index > -1) {
        this.cartItems.splice(index, 1); // Mutate local data, not prop
        this.updateLocalStorage();
      }
    },
    updateLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  },
  mounted() {
    this.cartItems = [...this.cart]; // Clone the prop on mount
  },
  watch: {
    cart: {
      handler(newCart) {
        this.cartItems = [...newCart]; // Keep cartItems synced with prop
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.cart-popup {
  position: fixed;
  top: 0;
  right: 0;
  width: 380px; /* Adjusted width to match design */
  max-height: 100vh;
  background-color: #fff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1); /* Softer shadow */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  z-index: 1000;
  padding: 24px; /* Slightly larger padding */
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #000;
}

.cart-items {
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

.cart-item {
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
}

.cart-item-image {
  max-width: 100%;
  max-height: 90px;
  display: block;
  margin: 0 auto;
  vertical-align: middle;
  margin-top: 2px;
}

.cart-item-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.cart-item-title {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.cart-item-price {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 16px;
  color: hsl(0deg 0% 10.2% / 50%);
  text-align: right;
}
.inline{
  display: flex;
  justify-content: space-between;

}
.pro-img{
  height: auto;
  max-height: 100px;
  width: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-right: 16px;
}
.remove-item-btn{
    background: none;
    border: none;
    color: hsl(0deg 0% 10.2% / 50%);
    font-size: 16px;
    cursor: pointer;
    text-align: right;
    padding: 0;
    font-weight: 500;
}

.cart-footer {
  padding: 20px 0;
  border-top: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cart-total {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.cart-total p{
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.checkout-btn {
  width: 100%;
  background-color: #4c00ff;
  color: white;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.checkout-btn:hover {
  background-color: #3800c6;
}

/* Scrollbar Styles */
.cart-popup {
  overflow-y: auto;
  scrollbar-width: thin;
}

.cart-popup::-webkit-scrollbar {
  width: 8px;
}

.cart-popup::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.cart-popup::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  border: 2px solid transparent;
}

.cart-popup::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

</style>

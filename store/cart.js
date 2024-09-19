export const state = () => ({
    cart: process.client ? JSON.parse(localStorage.getItem('cart')) || [] : []
  });
  
  
  
  export const mutations = {
    addToCart(state, product) {
      state.cart.push(product);
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    }
  }
  
  export const getters = {
    cartItems: state => state.cart,
    cartTotal: state => state.cart.reduce((total, item) => total + item.price, 0)
  }
  
  export const plugins = [
    store => {
      store.subscribe((mutation, state) => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
      });
    }
  ];
<template>
  <div>
    <header class="navbar">
      <span class="logo">
    <span class="voxel">Voxel</span>
    <span class="store">Store</span>
  </span>
      <div class="navbar-right">
        <div class="cart-icon" @click="toggleCart">
          <img src="@/assets/images/local_mall.svg" alt="Cart Icon" class="cart-svg" />
          <span class="cart-count">{{ cart.length }}</span>
        </div>
      </div>
    </header>

    <section class="banner">
      <img src="../assets/images/Hero.png" alt="Welcome to Voxel" class="banner-image" />
    </section>

    <nav class="category-nav isDesktop">
      <ul class="category-list">
        <li v-for="category in categories" :key="category" class="category-item">
          <a href="#" @click="filterCategory(category)" :class="{'active-category': selectedCategory === category}">
            {{ category }}
          </a>
        </li>
      </ul>
    </nav>

    <nav class="category-mobile-nav isMobile">
      <select @change="filterCategory($event.target.value)" class="category-dropdown">
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </nav>

    <div class="product-grid">
      <div class="product-card" v-for="product in filteredProducts" :key="product.id">
        <img :src="product.image" alt="Product Image" class="product-image" />
        <h3 class="product-title">{{ product.title }}</h3>
        <p class="product-price">${{ product.price }}</p>
        <button @click="addToCart(product)" class="add-to-cart-btn">+ Add to Cart</button>
      </div>
    </div>

    <!-- CartPopup component -->
    <CartPopup :isCartVisible="showCart" :cart="cart" @close="toggleCart" />
    <footer class="footer">
    <div class="footer-text">
      Voxel <span>Store</span>
    </div>
  </footer>
  </div>
</template>


<script>
import axios from 'axios';
import CartPopup from './CartPopup.vue'; // Import CartPopup

export default {
  components: {
    CartPopup
  },
  data() {
    return {
      products: [],
      filteredProducts: [],
      categories: ['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"],
      selectedCategory: 'all',
      cart: [],
      showCart: false // State to show/hide cart
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        this.products = response.data;
        this.filteredProducts = this.products;
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    },
    addToCart(product) {
      this.cart.push(product);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      alert(`${product.title} added to cart!`);
    },
    filterCategory(category) {
      this.selectedCategory = category;
      if (category === 'all') {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(product => product.category === category);
      }
    },
    toggleCart() {
      this.showCart = !this.showCart;
      console.log("Cart visibility toggled, current state:", this.showCart); // Debugging log
    }
  },
  mounted() {
    this.fetchProducts();
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
}

.logo {
  font-family: 'Instrument Sans', sans-serif;
}

.logo .voxel {
  font-size: 18px;
  font-weight: 600;
  color: black;
}

.logo .store {
  font-size: 18px;
  font-weight: 400;
  color: #888;
}

.cart-icon {
  position: relative;
  font-size: 24px;
  cursor: pointer;
}
.cart-svg {
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: inline-block;
}
.cart-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #ff6347;
  color: white;
  padding: 5px 8px;
  border-radius: 50%;
  font-size: 14px;
}

/* Banner Styles */
.banner {
  position: relative;
  text-align: center;
}

.banner-image {
  width: 100%;
  min-height: 380px;
  max-height: 400px;
  object-fit: cover;
}

.category-nav {
  display: flex;
  justify-content: left;
  margin-top: 20px;
  background-color: white;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  max-width: 1400px;
  margin: 0 auto;
}
.category-mobile-nav .category-dropdown{
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 600;
}
.isMobile{
    display: none;
  }

  .isDesktop {
    display: block;
  }

.category-list {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
}

.category-item a {
  text-transform: capitalize;
  text-decoration: none;
  font-size: 16px;
  color: #888;
  padding: 10px;
  transition: color 0.3s ease;
}

.category-item a:hover {
  color: #000;
}

.active-category {
  color: #000;
  border-bottom: 2px solid #000;
  padding-bottom: 5px;
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 24px 0 42px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Product Card */
.product-card {
  background-color: white;
  border: 1px solid #ddd;
  padding: 16px;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 293px;
  height: auto;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 293px;
  height: 280px;
  object-fit: contain;
  margin-bottom: 15px;
}

/* Product Title */
.product-title {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.52px;
  color: #1A1A1A;
  width: 293px;
  /* height: 40px; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  margin-bottom: 10px;
}


.product-price {
  font-size: 16px;
  color: #888;
  margin-bottom: 10px;
  text-align: left;
}

/* Add to Cart Button */
.add-to-cart-btn {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.52px;
  color: #1A1A1A;
  width: 293px;
  height: 56px;
  background-color: #F4F4F4;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 16px;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #E0E0E0;
}
.footer {
  background-color: #fff; /* Use the same background color as your navbar */
  padding: 20px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* Add a shadow for distinction */
  text-align: center;
  position: relative;
  bottom: 0;
  width: 100%;
}

.footer-text {
  font-family: 'Instrument Sans', sans-serif; /* Same font as the navbar */
  font-size: 18px;
  font-weight: 600;
  color: black;
}
.footer-text span {
  font-size: 18px;
  font-weight: 400;
  color: #888;
}

@media (max-width: 1200px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .desktop-category-nav {
    display: none; /* Hide desktop navigation on mobile */
  }

  .mobile-category-nav {
    display: block; /* Show dropdown on mobile */
    padding: 10px;
  }
  .isDesktop{
    display: none;
  }
  .isMobile{
    display: block;
  }
  .product-card{
    width: unset;
  }
  .add-to-cart-btn{
    width: 100%;
  }
}
</style>

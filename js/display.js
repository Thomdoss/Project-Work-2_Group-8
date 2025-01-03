app.component('product-display', {
   props: {
      premium: {
         type: Boolean,
         required: true,
      },
   },
   template:
      /*html*/
      `<div class="product-display">
     <div class="product-container">
       <div class="product-image">
         <img v-bind:src="image">
       </div>
       <div class="product-info">
         <h1>{{ title }}</h1>
 
         <p v-if = "quantity > 10">In Stock</p>
         <p v-else-if = "quantity <= 10 && quantity > 0">Almost out of Stock !</p>
         <p v-else>Out of Stock</p>
 
         <p>Shipping: {{ shipping }}</p>
         
         <!-- solution -->
         <product-details :details="details"></product-details>
         <!-- solution -->
 
         <div 
           v-for="(variant, index) in variants" 
           :key="variant.id" 
           @mouseover="updateVariant(index)" 
           class="color-circle" 
           :style="{ backgroundColor: variant.color }">
         </div>
         
         <button 
           class="button" 
           :class="{ disabledButton: !quantity }" 
           :disabled="!quantity" 
           v-on:click="addToCart">
           Add to Cart
         </button>

         <button 
           class="button" 
           :class="{ disabledButton: !this.cart || initial_quantity == quantity }" 
           :disabled="!this.cart || initial_quantity == quantity" 
           v-on:click="removeFromCart">
           Remove Cart
         </button>
       </div>
     </div>
   </div>`,
   data() {
      return {
         product: 'Iphone 14',
         brand: 'Apple',
         selectedVariant: 0,
         details: ['Nano SIM', '5G', '6.06 inches'],
         variants: [
            {
               id: 11,
               color: 'black',
               image: './img/iphone_14_black.jpg',
               quantity: 12,
               initial_quantity: 12,
            },
            {
               id: 12,
               color: '#a2b7ca',
               image: './img/iphone_14_blue.jpg',
               quantity: 150,
               initial_quantity: 150,
            },
            {
               id: 13,
               color: '#ff0425',
               image: './img/iphone_14_red.jpg',
               quantity: 0,
               initial_quantity: 0,
            },
         ],
         reviews: [],
         tabs: ['review-form', 'review-list'],
         activeTab: 'review-form',
         cart: 0,
      };
   },

   methods: {
      addToCart() {
         this.$emit('update-cart');
         this.variants[this.selectedVariant].quantity -= 1;
         this.cart += 1;
      },
      removeFromCart() {
         this.$emit('remove-cart');
         this.variants[this.selectedVariant].quantity += 1;
         this.cart -= 1;
      },
      updateVariant(index) {
         this.selectedVariant = index;
      },
   },
   computed: {
      title() {
         return this.brand + ' ' + this.product;
      },
      image() {
         return this.variants[this.selectedVariant].image;
      },
      quantity() {
         return this.variants[this.selectedVariant].quantity;
      },
      initial_quantity() {
         return this.variants[this.selectedVariant].initial_quantity;
      },
      shipping() {
         if (this.premium) {
            return 'Free';
         }
         return 2.99;
      },
   },
});

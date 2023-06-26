import { createRouter, createWebHistory } from 'vue-router'
import ProductsPage from '../views/ProductsPage.vue'
import AdminLoginPage from '../views/AdminLoginPage.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const auth = (token) => {
  // Implement your authentication logic here
  // Example: Check if the token is valid
  return new Promise((resolve, reject) => {
    if (token) {
      resolve(); // Token is valid, authentication succeeded
    } else {
      reject(); // Token is invalid or not available, authentication failed
    }
  });
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      name: 'Products',
      component: ProductsPage
    },
    {
      path: '/',
      redirect: '/products'
    },
    {
      path: '/login',
      name: 'login',
      component: AdminLoginPage,
      beforeEnter: (to, from, next) => {
        // auth(localStorage.getItem("token"))
        //   .then(() => {
        //     next({ name: 'dashboard' });
        //   })
        //   .catch(() => {
        //     next();
        //   });
        const token = localStorage.getItem("token");
          if (token) {
            // If the token exists, user is already authenticated
            next({ name: 'dashboard' });
          } else {
            // Token doesn't exist, allow the user to proceed to the login page
            next();
          }
            }
    },
    {
      path: '/admin-dashboard',
      name: 'dashboard',
      component: AdminDashboard,
      beforeEnter: (to, from, next) => {
        auth(localStorage.getItem("token"))
          .then(() => {
            next();
          })
          .catch(() => {
            next({ name: 'login' });
          });
      }
    }
  ]
});

export default router

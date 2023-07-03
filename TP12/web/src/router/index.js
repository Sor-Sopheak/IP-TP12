import { createRouter, createWebHistory } from 'vue-router'
import ProductsPage from '../views/ProductsPage.vue'
import LoginPage from '../views/LoginPage.vue'
import AdminDashboard from '../views/Dashboard/AdminDashboard.vue'
import SignUpPage from '../views/SignUpPage.vue'

const auth = (token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      resolve();
    } else {
      reject();
    }
  });
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: ()=> import ('../components/TheWelcome.vue')
    },
    {
      path: '/products',
      name: 'Products',
      component: ProductsPage,
    },
    {
      path: '/auth',
      name: 'auth',
      children:[
        {
          path: 'login',
          name: 'login',
          component:LoginPage,
          beforeEnter: (to, from, next) => {
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
          path: 'signup',
          name: 'signup',
          component:SignUpPage,
        }
      ]
      
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: AdminDashboard,

      children: [
        {
          path: 'category',
          name: 'category',
          component: ()=> import('../views/Dashboard/pages/Category.vue')
        },
        {
          path: 'item',
          name: 'item',
          component: ()=> import('../views/Dashboard/pages/Item.vue')
        },
        {
          path: 'product',
          name: 'product',
          component: ()=> import('../views/Dashboard/pages/Product.vue')
        }
      ],
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

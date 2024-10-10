import AllProducts from '../../components/product/AllProducts';
import EditProducts from '../../components/product/EditProducts';
import Cart from '../../pages/Cart';
import Login from '../../pages/Login';
import MyProducts from '../../pages/MyProducts';
import NoteFound from '../../pages/NoteFound';
import Orders from '../../pages/Orders';
import ProductDetails from '../../pages/ProductDetails';
import Profile from '../../pages/Profile';
import Register from '../../pages/Register';

/* Общие маршруты */
export const routes = [
  /* Products */
  { link: '/products', component: <AllProducts /> },
  { link: '/products/:id', component: <ProductDetails /> },

  /* User */
  { link: '/login', component: <Login /> },
  { link: '/register', component: <Register /> },

  /* Page */
  { link: '*', component: <NoteFound /> },
];

/* Приветные маршруты */
export const privateRoutes = [
  /* User */
  { link: '/profile', component: <Profile /> },

  /* Products */
  { link: '/products/my', component: <MyProducts /> },
  { link: '/products/edit/:id', component: <EditProducts /> },

  /* Orders */
  { link: '/orders', component: <Orders /> },

  /* Cart */
  { link: '/cart', component: <Cart /> }
];

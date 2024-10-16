import EditProducts from "../../components/product/EditProducts";
import MainProduct from "../../components/product/MainProduct";
import Cart from "../../pages/Cart";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import MyProducts from "../../pages/MyProducts";
import NotFound from "../../pages/NotFound";
import Orders from "../../pages/Orders";
import ProductDetails from "../../pages/ProductDetails";
import Profile from "../../pages/Profile";
import Register from "../../pages/Register";


/* Общие маршруты */
export const routes = [
  { link: '/', component: <Home /> }, // Добавлен маршрут для Home
  { link: '/products', component: <MainProduct /> },
  { link: '/products/:id', component: <ProductDetails /> },

  /* User */
  { link: '/login', component: <Login /> },
  { link: '/register', component: <Register /> },

  /* Страница 404 */
  { link: '*', component: <NotFound /> },
];

/* Приватные маршруты */
export const privateRoutes = [
  /* Профиль */
  { link: '/profile', component: <Profile /> },

  /* Продукты */
  { link: '/products/my', component: <MyProducts /> },
  { link: '/products/edit/:id', component: <EditProducts /> },

  /* Заказы */
  { link: '/orders', component: <Orders /> },

  /* Корзина */
  { link: '/cart', component: <Cart /> }
];

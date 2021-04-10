import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  createProductReducer,
  updateProductReducer,
  createReviewProductReducer,
  productTopRatedReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userEditReducer,
} from "./reducers/userReducers";
import { orderCreateReducer, orderDetailReducer, orderListReducer, orderListUserReducer, orderPayReducer, orderDeliverReducer, } from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer,
  orderPay: orderPayReducer,
  listAllOrders: orderListReducer,
  orderListUser: orderListUserReducer,
  orderDeliver: orderDeliverReducer,
  deleteUser: userDeleteReducer,
  editUser: userEditReducer,
  deleteProduct: productDeleteReducer,
  createProduct: createProductReducer,
  updateProduct: updateProductReducer,
  topProduct: productTopRatedReducer,
  createReviewProduct: createReviewProductReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    userInfo: userInfoFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

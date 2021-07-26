import { axiosPublic, axiosPrivate } from '../utils/axiosClient';
import {
  userRegisterActions,
  userSigninActions,
  userDetailsActions,
  userUpdateProfileActions,
  userUpdateActions,
  userListActions,
  userDeleteActions,
  userTopSellerListActions
} from '../Features/User/UserSlice';
import { Storage } from '../utils';
import { KEY } from '../constants';

export const register = (name, email, password, confirmPassword) =>
  axiosPublic({ email, password })(userRegisterActions)(
    userSigninActions._SUCCESS,
    (_data) => (Storage[KEY.USER_INFO] = _data)
  )('post', '/api/users/register', {
    name,
    email,
    password,
    confirmPassword
  });

export const signin = (email, password) =>
  axiosPublic({ email, password })(userSigninActions)(
    null,
    (_data) => (Storage[KEY.USER_INFO] = _data)
  )('post', '/api/users/signin', {
    email,
    password
  });

export const signout = () => (dispatch) => {
  Storage[KEY.USER_INFO] = '';
  Storage[KEY.CART_ITEMS] = '';
  Storage[KEY.SHIPPING_ADDRESS] = '';
  dispatch(userSigninActions._RESET());
  document.location.href = '/signin';
};

export const detailsUser = (userId) =>
  axiosPrivate(userId)(userDetailsActions)()('get', `/api/users/${userId}`);

export const updateUserProfile = (user) =>
  axiosPrivate(user)(userUpdateProfileActions)(
    userSigninActions._SUCCESS,
    (_data) => (Storage[KEY.USER_INFO] = _data)
  )('put', `/api/users/profile`, user);

export const updateUser = (user) =>
  axiosPrivate(user)(userUpdateProfileActions, userUpdateActions)()(
    'put',
    `/api/users/${user._id}`,
    user
  );

export const listUsers = () =>
  axiosPrivate()(userListActions)()('get', '/api/users');

export const deleteUser = (userId) =>
  axiosPrivate(userId)(userDeleteActions)()('delete', `/api/users/${userId}`);

export const listTopSellers = () =>
  axiosPublic()(userTopSellerListActions)()('get', '/api/users/top-sellers');

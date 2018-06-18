import { combineReducers } from 'redux';
import token from './token';
import dog from './dog';
import profile from './profile';

export default combineReducers({ token, dog, profile });

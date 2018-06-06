import superagent from 'superagent';
import * as route from '../route';


export const setTokenAction = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const removeTokenAction = () => ({
  type: 'TOKEN_REMOVE',
});


export const signupRequest = user => (store) => {
  return superagent.post(`${API_URL}${route.SIGNUP_ROUTE}`)
    .send(user)
    .withCredentials()
    .then((response) => {
      return store.dispatch(setTokenAction(response.text));
    });
};


export const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}${route.LOGIN_ROUTE}`)
    .auth(user.username, user.password)
    .withCredentials()
    .then((response) => {
      return store.dispatch(setTokenAction(response.text));
    });
};

import superagent from 'superagent';
import * as route from '../utils/route';

const setProfile = profile => ({
  type: 'CLIENT_PROFILE_SET',
  payload: profile,
});

const profileCreateRequest = profile => (store) => {
  const { token } = store.getState();

  return superagent.post(`${API_URL}${route.PROFILE_ROUTE}`)
    .set('Authorization', `Bearer ${token}`) 
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};

const profileUpdateRequest = profile => (store) => {
  const { token } = store.getState();

  return superagent.put(`${API_URL}${route.PROFILE_ROUTE}/${profile._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};

const profileFetchRequest = () => (store) => {
  const { token } = store.getState();

  return superagent.get(`${API_URL}${route.PROFILE_ROUTE}/me`)
    .set('Authorization', `Bearer ${token}`)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};


export { setProfile, profileCreateRequest, profileUpdateRequest, profileFetchRequest };

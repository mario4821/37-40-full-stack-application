import superagent from 'superagent';
import * as routes from '../utils/route';

const createPicture = picture => ({
  type: 'PICTURE_CREATE',
  payload: picture,
});

const createRequestPicture = file => (store) => {
  console.log(file);
  return superagent.post(`${API_URL}${routes.PICTURE_ROUTE}`)
    .attach('picture', file.preview)
    .field('description', file.description)
    .then((response) => {
      return store.dispatch(createPicture(response.body));
    });
};

export { createRequestPicture, createPicture };

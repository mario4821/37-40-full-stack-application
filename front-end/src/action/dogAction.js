import superagent from 'superagent';

const dogsFetch = dogs => ({
  type: 'DOGS_FETCH',
  payload: dogs,
});

const dogCreate = dog => ({
  type: 'DOG_CREATE',
  payload: dog,
});

const dogUpdate = dog => ({
  type: 'DOG_UPDATE',
  payload: dog,
});

const dogDelete = dog => ({
  type: 'DOG_DELETE',
  payload: dog,
});


const dogsFetchRequest = () => (store) => {
  return superagent.get(`${API_URL}/dogs`)
    .then((response) => {
      store.dispatch(dogsFetch(response.body));
      return response; 
    }); 
};

const dogCreateRequest = dog => (store) => {
  return superagent.post(`${API_URL}/dogs`)
    .send(dog)
    .then((response) => {
      store.dispatch(dogCreate(response.body));
      return response;
    });
};

const dogUpdateRequest = dog => (store) => {
  return superagent.put(`${API_URL}/dogs/${dog._id}`)
    .send(dog)
    .then((response) => {
      store.dispatch(dogUpdate(response.body));
      return response;
    });
};

const dogDeleteRequest = dog => (store) => {
  return superagent.delete(`${API_URL}/dogs/${dog._id}`)
    .then((response) => {
      store.dispatch(dogDelete(dog));
      return response;
    });
};

export { dogsFetchRequest, dogCreateRequest, dogUpdateRequest, dogDeleteRequest };

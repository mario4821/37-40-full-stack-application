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


const dogsFetchRequest = () => (dispatch) => {
  return superagent.get(`${API_URL}/dogs`)
    .then((response) => {
      dispatch(dogsFetch(response.body));
      return response; 
    }); 
};

const dogCreateRequest = dog => (dispatch) => {
  return superagent.post(`${API_URL}/dogs`)
    .send(dog)
    .then((response) => {
      dispatch(dogCreate(response.body));
      return response;
    });
};

const dogUpdateRequest = dog => (dispatch) => {
  return superagent.put(`${API_URL}/dogs/${dog._id}`)
    .send(dog)
    .then((response) => {
      dispatch(dogUpdate(response.body));
      return response;
    });
};

const dogDeleteRequest = dog => (dispatch) => {
  return superagent.delete(`${API_URL}/dogs/${dog._id}`)
    .then((response) => {
      dispatch(dogDelete(dog));
      return response;
    });
};

export { dogsFetchRequest, dogCreateRequest, dogUpdateRequest, dogDeleteRequest };

import { validateDog } from '../utils/index';

const emptyState = [];

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'DOGS_FETCH':
      return payload;
    case 'DOG_CREATE':
      validateDog(payload);
      return [payload, ...state];
    case 'DOG_UPDATE':
      validateDog(payload);
      return state.map(dog => (dog._id === payload._id ? payload : dog));
    case 'DOG_DELETE':
      validateDog(payload);
      return state.filter(dog => dog._id !== payload._id);
    default: 
      return state;
  }
};

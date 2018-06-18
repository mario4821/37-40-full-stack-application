export const validatePicture = (picture) => {
  if (!picture) throw new Error('No picture was included in request');

  const { 
    _id, description, dog, 
  } = picture;

  if (!_id || !description || !dog) {
    throw new Error('Invalid picture properties');
  }
};

export default (state = [], { type, payload }) => {
  switch (type) {
    case 'CREATE_PICTURE':
      validatePicture(payload);
      return [payload, ...state];
    case 'TOKEN_REMOVE':
      return [];
    default:
      return state;
  }
};

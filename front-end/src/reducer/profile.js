const D23_001 = 'Profile is required';
const D23_002 = 'Invalid Profile';

const validateProfile = (profile) => {
  if (!profile) {
    throw new Error(D23_001);
  }
  const {
    firstName, lastName, phoneNumber, location,
  } = profile;

  if (!firstName || !lastName || !phoneNumber || !location) {
    throw new Error(D23_002);
  }
  return undefined;
};

export default (state = null, { type, payload }) => {
  switch (type) {
    case 'CLIENT_PROFILE_SET':
      validateProfile(payload);
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};

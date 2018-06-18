const validateProfile = (profile) => {
  if (!profile) {
    throw new Error('profile is required');
  }
  const {
    firstName, 
    lastName, 
    phoneNumber, 
    location,
  } = profile;

  if (!firstName || !lastName || !phoneNumber || !location) {
    throw new Error('invalid profile information');
  }
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

export default function autoBind(classComponent) {
  const classMethods = Object.getOwnPropertyNames(classComponent.prototype);
  classMethods.forEach((method) => {
    if (method.startsWith('handle')) {
      this[method] = this[method].bind(this);
    }
  });
}

export const validateDog = (payload) => {
  if (!payload._id) {
    throw new Error('VALIDATION ERROR: dog must have an id');
  }

  if (!payload.firstName || !payload.location) {
    throw new Error('VALIDATION ERROR: dog must have a title');
  }
};

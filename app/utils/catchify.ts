const catchify = <T>(promise: Promise<T>) =>
  promise
    .then((res): [null, T] => [null, res])
    .catch((error): [unknown, null] => [error, null]);

export default catchify;

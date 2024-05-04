class LogService<T> {
  log(error: T) {
    console.error(error); // to use sentry.io or other log services in the future :)
  }
}

export default LogService;

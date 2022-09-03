const config = {
  development: {
    requestUrl: 'http://localhost:8080',
    socketUrl: {
      url: 'ws://localhost:8081',
      path: '/client/'
    }
  },
  test: {
    requestUrl: 'http://localhost',
    socketUrl: {
      url: 'ws://localhost:8081',
      path: '/client/'
    }
  },
  production: {
    requestUrl: 'http://localhost',
    socketUrl: {
      url: 'ws://localhost:8080',
      path: '/client/'
    }
  }
}
let needconfig = config[project_env];
export default needconfig;
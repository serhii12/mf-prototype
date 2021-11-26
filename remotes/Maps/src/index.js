import('./bootstrap')
  .then(({ mount }) => {
    if (process.env.NODE_ENV === 'development') {
      const devRoot = document.querySelector('#root_2');

      if (devRoot) {
        mount(devRoot);
      }
    }
  })
  .catch((err) => err);

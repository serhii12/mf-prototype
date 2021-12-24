// @ts-nocheck
import('./bootstrap_mf3')
  .then(({ mount }) => {
    if (process.env.NODE_ENV === 'development') {
      const devRoot = document.querySelector('#root');

      if (devRoot) {
        mount(devRoot);
      }
    }
  })
  .catch((err) => console.error(err));

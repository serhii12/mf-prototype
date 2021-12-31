const cache = {};

export const LOAD_MF = async (path: string) => {
  const [remoteName, remoteUrl] = Object.entries(window.__remotes__).find(([r]) =>
    path.startsWith(r)
  );

  if (!remoteName) throw new Error(`URL not configured for remote '${path}'.`);
  if (remoteUrl.split('@').length !== 2) throw new Error(`URL misconfigured for remote '${path}'`);

  const [moduleName, moduleUrl] = remoteUrl.split('@');

  if (cache[moduleName] && typeof cache[moduleName] === 'function') {
    return cache[moduleName]();
  }

  // eslint-disable-next-line no-undef
  await __webpack_init_sharing__('default');

  await new Promise<void>((resolve, reject) => {
    const element = document.createElement('script');

    element.src = moduleUrl;
    element.type = 'text/javascript';
    element.async = true;

    element.onload = () => {
      element.parentElement.removeChild(element);
      resolve();
    };

    element.onerror = (err) => {
      element.parentElement.removeChild(element);
      reject(err);
    };

    document.head.appendChild(element);
  });

  const container = window[moduleName];
  // eslint-disable-next-line no-undef
  await container.init(__webpack_share_scopes__.default);
  const component = `.${path.replace(remoteName, '')}`;
  const factory = await container.get(component);

  cache[moduleName] = factory;

  return factory();
};

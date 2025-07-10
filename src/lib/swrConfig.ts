export const swrGlobalConfig = {
  refreshInterval: 3000,
  fetcher: (resource: RequestInfo, init?: RequestInit) =>
    fetch(resource, init).then((res) => res.json()),
};

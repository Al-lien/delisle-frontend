export const environment = {
  production: false, // Indicates that this is the development environment
  apiUrl: 'http://localhost:8085/api/v1', // Development API endpoint
  requests: {
    reportCardPaginated: {
      endpoint: '',
      pageSize: 10,
      totalLength: 420, // TODO: remove
    },
  },
  map: {
    thunderforest: {
      baseLayer: 'atlas',
      apiKey: 'c60f76842ef24c269fa4d7771790cedf',
    },
    config: {
      view: {
        // TODO: change map projection (EPSG:2154 - Lambert 93)
        projection: 'EPSG:4326',
        center: [0, 0],
        zoom: 13.5,
        maxZoom: 18,
        minZoom: 13.5,
        extent: [4.778531, 45.697863, 4.98117413078694, 45.876622],
      },
      layer:
        'https://data.grandlyon.com/geoserver/metropole-de-lyon/ows?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=metropole-de-lyon:pvo_patrimoine_voirie.pvostationvelov&outputFormat=application/json&SRSNAME=EPSG:4326&startIndex=0&sortBy=gid',
    },
  },
};

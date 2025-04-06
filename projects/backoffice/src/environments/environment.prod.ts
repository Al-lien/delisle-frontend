export const environment = {
  production: true, // Indicates that this is the production environment
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
      apiKey: process.env['THUNDERFOREST_API_KEY'] || '',
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
      layer: process.env['GRAND_LYON_MAP_LAYER'] || '',
    },
  },
};

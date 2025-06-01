const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Realtime Chat Based System',
      version: '1.0.0',
      description: 'The Realtime Chat Based System App API is designed to facilitate interactions with the SPS application system.',
    },
    servers: [
      {
        url: '/api',
        description: 'Base API server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;

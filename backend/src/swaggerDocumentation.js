const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Realtime Chat System API',
      version: '1.0.0',
      description:
        'This API documentation provides a comprehensive overview of the endpoints used in the Realtime Chat System. It allows clients to interact with the system for sending and receiving chat messages, managing users, and handling real-time communication efficiently.',
    },
    servers: [
      {
        url: '/api',
        description: 'Main API server for the Realtime Chat System',
      },
    ],
  },
  apis: ['./src/routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;

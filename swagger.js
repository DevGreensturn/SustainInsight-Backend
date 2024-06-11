const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Management API Documentation',
      version: '1.0.0',
      description: 'Documentation for the User Management API',
    },
    servers: [
      {
        url: `http://localhost:${process.env.USER_MS_PORT || 3001}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, 'controller', '*.js'), path.join(__dirname, 'routes', 'v1', '*.js')],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
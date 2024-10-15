import config from '../knexfile.js'; // Import the Knex configuration
import knex from 'knex';

// Set the environment: 'development' or 'production'
const environment = process.env.NODE_ENV || 'development';
const knexConfig = config[environment];

// Initialize Knex with the selected configuration
const db = knex(knexConfig);

export default db;
import * as dotenv from 'dotenv';

dotenv.config(); 

const config = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5000,
      database: 'CRIS',
      user: 'postgres',
      password: 'ziza@April42519'
    },
    migrations: {
      directory: 'migrations',
      extension: 'js'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

export default config;
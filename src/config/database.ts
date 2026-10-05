import "reflect-metadata";

import dotenv from "dotenv";

import {
  DataSource,
} from "typeorm";

import {
  User,
} from "../entities/user.entity";

import {
  Address,
} from "../entities/address.entity";

import {
  VendorProfile,
} from "../entities/vendor-profile.entity";


/*
|--------------------------------------------------------------------------
| Load Environment Variables
|--------------------------------------------------------------------------
*/

dotenv.config();


/*
|--------------------------------------------------------------------------
| Database Environment Variables
|--------------------------------------------------------------------------
*/

const DB_HOST =
  process.env.DB_HOST;

const DB_PORT =
  process.env.DB_PORT;

const DB_USERNAME =
  process.env.DB_USERNAME;

const DB_PASSWORD =
  process.env.DB_PASSWORD;

const DB_DATABASE =
  process.env.DB_DATABASE;


/*
|--------------------------------------------------------------------------
| Validate Database Configuration
|--------------------------------------------------------------------------
*/

if (
  !DB_HOST ||
  !DB_PORT ||
  !DB_USERNAME ||
  !DB_DATABASE
) {
  throw new Error(
    "Database environment variables are missing."
  );
}


/*
|--------------------------------------------------------------------------
| MySQL Port
|--------------------------------------------------------------------------
*/

const databasePort =
  Number(DB_PORT);

if (
  Number.isNaN(databasePort)
) {
  throw new Error(
    "DB_PORT must be a valid number."
  );
}


/*
|--------------------------------------------------------------------------
| TypeORM Data Source
|--------------------------------------------------------------------------
*/

export const appDataSource =
  new DataSource({

    type: "mysql",

    host: DB_HOST,

    port: databasePort,

    username: DB_USERNAME,

    password:
      DB_PASSWORD ?? "",

    database: DB_DATABASE,

    entities: [
      User,
      Address,
      VendorProfile,
    ],

    /*
     * IMPORTANT:
     *
     * Keep synchronize false.
     *
     * We do not want TypeORM automatically
     * changing the existing GoogleDoko database.
     */
    synchronize: false,

    logging: false,
  });
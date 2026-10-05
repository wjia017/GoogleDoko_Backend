import "reflect-metadata";

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


const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;


if (
  !DB_HOST ||
  !DB_USERNAME ||
  !DB_DATABASE
) {
  throw new Error(
    "Database environment variables are missing."
  );
}


export const appDataSource =
  new DataSource({
    type: "mysql",

    host: DB_HOST,

    port:
      Number(DB_PORT) || 3306,

    username: DB_USERNAME,

    password:
      DB_PASSWORD ?? "",

    database: DB_DATABASE,

    entities: [
      User,
      Address,
      VendorProfile,
    ],

  
    synchronize: false,

    logging: false,
  });
import { Client } from 'pg';
import dotenv from 'dotenv'

dotenv.config()


const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

const users = `CREATE TABLE IF NOT EXISTS
      users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR (50) NOT NULL,
        lastName VARCHAR (50) NOT NULL,
        email VARCHAR (50)  NOT NULL,
        address VARCHAR (50) NOT NULL,
        phoneNumber VARCHAR (50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        isAdmin BOOLEAN DEFAULT false NOT NULL
       )`;

const property = `CREATE TABLE IF NOT EXISTS
    property(
        id SERIAL PRIMARY KEY,
        createdOn timestamp without time zone DEFAULT now() NOT NULL,
        owner INT NOT NULL,
        price FLOAT NOT NULL,
        address VARCHAR (150)  NOT NULL,
        city VARCHAR (100)  NOT NULL,
        state VARCHAR (100)  NOT NULL,
        type VARCHAR (50)  NOT NULL,
        imageUrl VARCHAR (500)  NOT NULL,
        status VARCHAR (50) DEFAULT 'available' NOT NULL
    )`;
const flags = `CREATE TABLE IF NOT EXISTS
    flags(
        id SERIAL PRIMARY KEY,
        propertyId INT NOT NULL,
        reason VARCHAR (100)  NOT NULL,
        description VARCHAR (255)  NOT NULL,
        createdOn timestamp without time zone DEFAULT now() NOT NULL
    )`;

client.connect()
.then(() => console.log('connected . . .'))
.then(() => client.query(users))
.then(() => client.query(property))
.then(() => client.query(flags))
.catch(e => console.log(e.message))


export default client;
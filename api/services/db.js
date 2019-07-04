import { Client } from 'pg';
import dotenv from 'dotenv'

dotenv.config()


const client = new Client({
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
});

client.connect()


export default client;
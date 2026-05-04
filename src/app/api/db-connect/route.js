"use server";
import sql from 'mssql';

const config = {
  server: process.env.AZURE_SQL_SERVER,
  database: process.env.AZURE_SQL_DATABASE,
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  port: Number(process.env.AZURE_SQL_PORT || 1433),
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

let pool;

async function getConnection() {
    if (!pool) {
        pool = new sql.ConnectionPool(config);
        await pool.connect();
    }
    return pool;
}

export async function queryDatabase(query, params = []) {
    try {
        const pool = await getConnection();
        const request = pool.request();

        params.forEach((param, index) => {
            request.input(`param${index}`, param);
        });

        const result = await request.query(query);
        return result.recordset;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

export async function closeConnection() {
    if (pool) {
        await pool.close();
    }
}
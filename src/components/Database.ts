import { MongoClient } from 'mongodb';

export const getMongoDB = (() => {
    const { DB_URL, DB_PORT, DB_NAME } = process.env;
    const client = new MongoClient(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`);
    let init = false;
    return async function() {
        if (init) {
            return client.db();
        }
        init = true;
        await client.connect();
        return client.db();
    };
})();
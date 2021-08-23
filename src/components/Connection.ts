import { Connection, createConnection, getConnection } from 'typeorm';

export const globalConnection = (() => {
    let init = false;
    return async function() {
        if (init) {
            return getConnection();
        }
        init = true;
        let conn = await createConnection();
        return conn;
    };
})();
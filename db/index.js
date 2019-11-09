const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('database.db');
exports.dbName = 'database.db';

/**
 * @param  dbName, Name of the database to connect to
 */
exports.connect = (dbName) => {
  db.close();
  db = new sqlite3.Database(dbName);
  this.dbName = dbName;
};

/**
 * Runs an SQL query on the database, and doesn't return any result from query.
 * @param  sql, SQL for query to execute
 * @return Promise
 *
 */
exports.run = sql => new Promise((resolve, reject) => {
  db.run(sql, (err) => {
    if (err) {
      reject(err);
    }
    resolve();
  });
});

/**
 * Runs an SQL query on the database, and returns the result from the query.
 * @param sql SQL query to execute
 * @return Promise
 */
exports.runQuery = sql => new Promise((resolve, reject) => {
  db.run(sql, function (err) {
    if (err) {
      reject(err);
    } else {
      resolve(this);
    }
  });
});

/**
 * Execute an SQL query on the database, and returns the first row.
 * @param  sql, SQL for query to execute
 * @return Result of query
 *
 */
exports.get = sql => new Promise((resolve, reject) => {
  db.get(sql, (err, row) => {
    if (err) {
      reject(err);
    }
    resolve(row);
  });
});

/**
 * Execute an SQL query on the database, and returns all rows.
 * @param  sql, SQL for query to execute
 * @return Result of query
 *
 */
exports.all = sql => new Promise((resolve, reject) => {
  db.all(sql, (err, rows) => {
    if (err) {
      reject(err);
    }
    resolve(rows);
  });
});

/**
 * Clears all data in the database
 */
exports.clear = () => {
  if (this.dbName === 'database.db') {
    console.warn("I don't think you really want to do that.");
    return;
  }

  return Promise.all([
    this.run('DELETE FROM item;')
  ]);
};

exports.addNewUri = (name, uri, price_point) => {
  return this.run(`
    INSERT INTO item
    (name, uri, last_item, price_point, active)
    VALUES
    ('${name}', '${uri}', '', '${price_point}', 1)
  `);
}

exports.deleteUri = (id) => {
  return this.run(`
    DELETE FROM item
    WHERE id=${id}
  `);
}

exports.getLastItem = (uri) => {
  return this.get(`
    SELECT last_item
    FROM item
    WHERE uri='${uri}'
  `);
}

exports.getAllActiveUris = () => {
  return this.all(`
    SELECT *
    FROM item
    WHERE active=1
  `);
}

exports.updatePricePoint = (id, price_point) => {
  return this.run(`
    UPDATE item
    SET price_point='${price_point}'
    WHERE id=${id}
  `);
}

exports.updateLastItem = (uri, last_item) => {
  console.log(`'updating last item' ${last_item} === ${uri}`);
  return this.run(`
    UPDATE item
    SET last_item='${last_item}'
    WHERE uri='${uri}'
  `);
}
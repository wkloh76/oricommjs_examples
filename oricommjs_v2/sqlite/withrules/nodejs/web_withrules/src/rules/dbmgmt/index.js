"use strict";
/**
 * auth
 * @module src_rules_auth_index
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj, [owncomp]] = args;
    const [pathname, curdir, compname] = params;
    const [library, sys, cosetting] = obj;
    const { components, utils, engine } = library;
    const { handler } = utils;
    const { sqlite3 } = engine.sqlmanager;

    try {
      let lib = {};

      lib["start_sqlite3"] = async (...args) => {
        let [request, response] = args;
        try {
          let { rule } = response;
          let db = "sample";
          let rtn = await sqlite3.connector(db, compname);
          if (rtn.code == 0) rule["db"] = { ...rule["db"], ...rtn.data[db] };
        } catch (error) {
          response.err.error = error.message;
        } finally {
          return response;
        }
      };

      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
};

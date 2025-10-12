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
    const { mariadb } = engine.sqlmanager;

    try {
      let lib = {};

      lib["start_mariadb"] = async (...args) => {
        let [request, response] = args;
        try {
          let { rule } = response;
          let db = "mysample";
          let rtn = await mariadb.connector(db, compname);
          if (rtn.code == 0) rule["db"] = { ...rule["db"], ...rtn.data[db] };
        } catch (error) {
          response.err.error = error.message;
        } finally {
          return response;
        }
      };

      lib["close_mariadb"] = async (...args) => {
        let [, response] = args;
        try {
          let { rule } = response;
          if (rule.db) await rule.db.disconnect();

          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };

      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
};

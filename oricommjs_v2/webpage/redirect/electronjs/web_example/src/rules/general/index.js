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

      lib["auth"] = (...args) => {
        let [request, response] = args;
        try {
          let { session } = request;
          let { render } = response;
          if (!session._data.pageno) {
            session._data.pageno = "1";
            render.options[
              "redirect"
            ] = `/${compname}/externalfile/page/welcome?pageno=1`;
          }
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

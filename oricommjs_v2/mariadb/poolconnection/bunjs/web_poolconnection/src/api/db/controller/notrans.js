"use strict";
/**
 * The controller of sqlite
 * @module general
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj, optional] = args;
    const [pathname, curdir, compname] = params;
    const [library, sys, cosetting] = obj;
    const { components, engine, dir, utils } = library;
    const { sqlmanager } = engine;
    const { mariadb } = sqlmanager;
    const { handler, concatobj, errhandler, mergeDeep } = utils;
    const [owncomp, regulation] = optional;

    try {
      let db = "mysample";
      let lib = utils.handler.restfulapi;
      let { GET, POST } = lib;

      GET["selectall"] = (...args) => {
        return new Promise(async (resolve) => {
          const [request, response] = args;
          const { handler } = utils;
          let output = handler.dataformat;
          try {
            let { render } = response;

            let rtn = await mariadb.connector(db, compname);
            if (rtn.code == 0) {
              let { query, rules, disconnect } = rtn.data[db];
              let cond = { ...rules, ...{ queryone: false } };
              let prepare = `SELECT * FROM ${db}.animals `;
              output = await query([{ type: "SELECT", sql: prepare }], cond);
              await disconnect();
            } else output = rtn;

            render.options["json"] = output;
          } catch (error) {
            response.err.error = error.message;
          } finally {
            resolve(response);
          }
        });
      };

      GET["select"] = (...args) => {
        return new Promise(async (resolve) => {
          const [request, response] = args;
          const { handler } = utils;
          let output = handler.dataformat;
          try {
            let { render } = response;
            let params = handler.getprm(request);
            let rtn = await mariadb.connector(db, compname);
            if (rtn.code == 0) {
              let { query, rules } = rtn.data[db];
              let cond = { ...rules, ...{ queryone: false } };
              let prepare = `SELECT * FROM ${db}.animals `;
              prepare += `WHERE scientific_name='${params.name}';`;
              output = await query([{ type: "SELECT", sql: prepare }], cond);
            } else output = rtn;

            render.options["json"] = output;
          } catch (error) {
            response.err.error = error.message;
          } finally {
            resolve(response);
          }
        });
      };

      resolve({ module: lib, regulation });
    } catch (error) {
      reject(error);
    }
  });
};

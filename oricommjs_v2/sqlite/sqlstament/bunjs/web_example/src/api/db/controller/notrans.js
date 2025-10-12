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
    const { sqlite3, sqltemplate } = sqlmanager;
    const { handler, concatobj, errhandler, mergeDeep } = utils;
    const [owncomp, regulation] = optional;

    try {
      let db = "sample";
      let lib = utils.handler.restfulapi;
      let { GET, POST } = lib;

      GET["selectall"] = (...args) => {
        return new Promise(async (resolve) => {
          const [request, response] = args;
          const { handler } = utils;
          let output = handler.dataformat;
          try {
            let { render } = response;

            let rtn = await sqlite3.connector(db, compname);
            if (rtn.code == 0) {
              let { query, rules } = rtn.data[db];
              let cond = { ...rules, ...{ queryone: false } };
              let prepare = "SELECT * FROM animals;";
              output = query([{ type: "SELECT", sql: prepare }], cond);
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
            let rtn = await sqlite3.connector(db, compname);
            if (rtn.code == 0) {
              let { query, rules } = rtn.data[db];
              let cond = { ...rules, ...{ queryone: false } };
              let prepare = "SELECT * FROM animals ";
              prepare += `WHERE scientific_name='${params.name}';`;
              output = query([{ type: "SELECT", sql: prepare }], cond);
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

"use strict";
/**
 * The controller of sqlite_rule
 * @module general
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj, optional] = args;
    const [pathname, curdir, compname] = params;
    const [library, sys, cosetting] = obj;
    const { components, utils } = library;
    const [owncomp, regulation] = optional;

    try {
      let db = "mysample";
      let lib = utils.handler.restfulapi;
      let { GET, POST } = lib;

      let { YS_mariadb } = regulation;
      YS_mariadb.push("select selectall");

      GET["selectall"] = (...args) => {
        return new Promise(async (resolve) => {
          const [request, response] = args;
          const { handler } = utils;
          let output = handler.dataformat;
          try {
            let { render, rule } = response;
            let { query, rules } = rule["db"];
            let cond = { ...rules, ...{ queryone: false } };
            let prepare = `SELECT * FROM ${db}.animals;`;
            output = await query([{ type: "SELECT", sql: prepare }], cond);

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
            let { render, rule } = response;
            let params = handler.getprm(request);
            let { query, rules } = rule["db"];
            let cond = { ...rules, ...{ queryone: false } };
            let prepare = `SELECT * FROM ${db}.animals `;
            prepare += `WHERE scientific_name='${params.name}';`;
            output = await query([{ type: "SELECT", sql: prepare }], cond);

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

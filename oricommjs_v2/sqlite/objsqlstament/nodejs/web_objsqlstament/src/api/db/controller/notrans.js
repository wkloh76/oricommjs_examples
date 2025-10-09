"use strict";
/**
 * The controller of sqlite
 * @module template
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
    let { join } = sys.path;

    try {
      let db = "sample";
      let lib = utils.handler.restfulapi;
      let { GET, POST } = lib;

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
              let { SELECT, TABLE, WHERE } = handler.sqlgeneric;

              TABLE = ["animals"];
              SELECT = [
                {
                  scientific_name: "name",
                  common_name: "common",
                  kingdom: "kingdom",
                  phylum: "phylum",
                  class: "class",
                  characteristics: "classification",
                  conservation_status: "status",
                  created_at: "time",
                },
              ];

              WHERE = handler.sqlgeneric.WHERE;
              WHERE.AND = { ...params };

              let prepare = await sqlmanager.sqltemplate.generate({
                SELECT,
                TABLE,
                WHERE,
              });

              if (prepare.code == 0) {
                output = query([{ type: "SELECT", sql: prepare.data.value }], {
                  ...rules,
                  ...{ queryone: false },
                });
              } else output = prepare;
            } else output = rtn;

            render.options["json"] = output;
          } catch (error) {
            response.err.error = error.message;
          } finally {
            resolve(response);
          }
        });
      };

      GET["update"] = (...args) => {
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
              let { UPDATE, TABLE, WHERE } = handler.sqlgeneric;

              TABLE = ["animals"];
              UPDATE = [
                {
                  class: "WKLOH",
                },
              ];

              WHERE.AND = { ...params };

              let prepare = await sqlmanager.sqltemplate.generate({
                UPDATE,
                TABLE,
                WHERE,
              });

              if (prepare.code == 0) {
                output = query([{ type: "UPDATE", sql: prepare.data.value }], {
                  ...rules,
                  ...{ queryone: false },
                });
              } else output = prepare;
            } else output = rtn;

            render.options["json"] = output;
          } catch (error) {
            response.err.error = error.message;
          } finally {
            resolve(response);
          }
        });
      };

      GET["insert"] = (...args) => {
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
              let { INSERT, TABLE } = handler.sqlgeneric;

              TABLE = ["animals"];
              INSERT = [
                {
                  scientific_name: "Tiger Malaysia",
                  common_name: "Asian Tiger",
                  kingdom: "Animalia",
                  phylum: "Chordata",
                  class: "Mammalia",
                  characteristics: JSON.stringify({
                    habitat: "Savannas, forests",
                    diet: "Herbivorous",
                    lifespan: "60-70 years",
                    size: { height: "3-4 m", weight: "4000-7000 kg" },
                    behavior: ["Social", "Matriarchal"],
                    special_features: ["Trunk", "Large ears", "Ivory tusks"],
                  }),
                  conservation_status: "Vulnerable",
                },
              ];

              let prepare = await sqlmanager.sqltemplate.generate({
                INSERT,
                TABLE,
              });

              if (prepare.code == 0) {
                output = query([{ type: "INSERT", sql: prepare.data.value }], {
                  ...rules,
                  ...{ queryone: false },
                });
              } else output = prepare;
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

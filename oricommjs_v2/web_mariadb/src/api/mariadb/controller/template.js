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
    const { mariadb, sqltemplate } = sqlmanager;
    const { handler, concatobj, errhandler, mergeDeep } = utils;
    const [owncomp, regulation] = optional;
    let { join } = sys.path;

    try {
      let db = "mysample";
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
            let rtn = await mariadb.connector(db, compname);
            if (rtn.code == 0) {
              let { query, rules, disconnect } = rtn.data[db];
              let { DB, SELECT, TABLE, WHERE } = handler.sqlgeneric;
              DB = db;
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
                DB,
                SELECT,
                TABLE,
                WHERE,
              });

              if (prepare.code == 0) {
                output = await query(
                  [{ type: "SELECT", sql: prepare.data.value }],
                  {
                    ...rules,
                    ...{ queryone: false },
                  }
                );
                await disconnect();
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
            let rtn = await mariadb.connector(db, compname);
            if (rtn.code == 0) {
              let { query, rules, disconnect } = rtn.data[db];
              let { DB, UPDATE, TABLE, WHERE } = handler.sqlgeneric;

              DB = db;
              TABLE = ["animals"];
              UPDATE = [
                {
                  class: "WKLOH",
                },
              ];

              WHERE.AND = { ...params };

              let prepare = await sqlmanager.sqltemplate.generate({
                DB,
                UPDATE,
                TABLE,
                WHERE,
              });

              if (prepare.code == 0) {
                output = await query(
                  [{ type: "UPDATE", sql: prepare.data.value }],
                  {
                    ...rules,
                    ...{ queryone: false },
                  }
                );
                await disconnect();
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
            let rtn = await mariadb.connector(db, compname);
            if (rtn.code == 0) {
              let { query, rules, disconnect } = rtn.data[db];
              let { DB, INSERT, TABLE } = handler.sqlgeneric;

              DB = db;
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
                DB,
                INSERT,
                TABLE,
              });

              if (prepare.code == 0) {
                output = await query(
                  [{ type: "INSERT", sql: prepare.data.value }],
                  {
                    ...rules,
                    ...{ queryone: false },
                  }
                );
                await disconnect();
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

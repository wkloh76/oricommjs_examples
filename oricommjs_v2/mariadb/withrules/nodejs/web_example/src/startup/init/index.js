"use strict";
/**
 * init
 * @module src_startup_init_index
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj, optional] = args;
    const [pathname, curdir, compname] = params;
    const [library, sys, cosetting] = obj;
    const { atomic, engine, components } = library;
    const { startupinit } = atomic.atom;
    const { sqlmanager } = engine;
    const { mariadb } = sqlmanager;
    const { mariadb: setting } = cosetting.ongoing[compname];
    const { path } = sys;
    const { join } = path;
    const [owncomp] = optional;

    try {
      let lib = {};

      lib["startup"] = async (...args) => {
        try {
          await startupinit.mariadb([setting, compname], pathname, mariadb);
          return;
        } catch (error) {
          return error;
        }
      };

      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
};

// @pola-rs/polars

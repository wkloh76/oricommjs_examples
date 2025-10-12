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
    const { sqlite3 } = sqlmanager;
    const { sqlite3: setting } = cosetting.ongoing[compname];
    const { path } = sys;
    const { join } = path;
    const [owncomp] = optional;

    try {
      let lib = {};

      lib["startup"] = async (...args) => {
        try {
          await startupinit.sqlite3([setting, compname], pathname, sqlite3);
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

"use strict";

/**
 * Submodule of logicflow in ES Module type
 * @module page
 */

export default await (() => {
  return new Promise(async (resolve, reject) => {
    const { atomic, utils } = library;
    const { interfaces } = atomic.guimaker;
    const { errhandler, handler } = utils;
    try {
      let lib = {};

      lib.div_system = (...args) => {
        const [data] = args;
        let rtn = handler.dataformat;
        try {
          document.querySelector(data).outerHTML += " Update by wkloh!";
        } catch (error) {
          rtn = errhandler(error);
        } finally {
          return rtn;
        }
      };

      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
})();

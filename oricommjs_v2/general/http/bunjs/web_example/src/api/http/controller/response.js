"use strict";
/**
 * The controller of http
 * @module response
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj, optional] = args;
    const [pathname, curdir, compname] = params;
    const [library, sys, cosetting] = obj;
    const { components, dir, utils } = library;
    const { handler, concatobj, errhandler, mergeDeep } = utils;
    const [owncomp, regulation] = optional;
    let { join } = sys.path;

    try {
      let lib = utils.handler.restfulapi;
      let { GET, POST } = lib;

      GET["json"] = (...args) => {
        return new Promise(async (resolve) => {
          const [request, response] = args;
          const { handler } = utils;
          let output = handler.dataformat;
          try {
            let { render } = response;
            if (!request.session.name) request.session.name = "wkloh";
            render.options["json"] = { data: "hello word" };
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

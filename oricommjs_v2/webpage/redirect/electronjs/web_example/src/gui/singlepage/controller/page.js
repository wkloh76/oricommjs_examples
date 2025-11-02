"use strict";
/**
 * The controller of render
 * @module page
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj, optional] = args;
    const [pathname, curdir, compname] = params;
    const [library, sys, cosetting] = obj;
    const { atomic, components, dir, utils } = library;
    const { handler, concatobj, errhandler, mergeDeep } = utils;
    const { join } = sys.path;
    const { ongoing } = cosetting;
    const { remote } = ongoing[compname];
    const { cdn } = remote;
    const [owncomp, regulation] = optional;
    const { viewspath: commonviews } = owncomp.common;

    try {
      let lib = utils.handler.restfulapi;
      let { GET, POST } = lib;

      GET["welcome-1"] = (...args) => {
        let [request, response] = args;
        try {
          let { render, rule } = response;
          let { options } = render;
          let { css, js, layer, less, mjs, injectionjs } = options;
          let { childs } = layer;
          let webengine = handler.webengine;

          layer.layouts = "";

          render.view = `${pathname}/views/welcome.html`;

          injectionjs["variables"] = { compname };

          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };

      GET["welcome-2"] = (...args) => {
        let [request, response] = args;
        try {
          let { render, rule } = response;
          let { options } = render;
          let { css, js, layer, less, mjs, injectionjs } = options;
          let { childs } = layer;
          let webengine = handler.webengine;

          render.view = `${pathname}/views/welcome2.html`;

          injectionjs["variables"] = { compname };

          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };

      GET["welcome"] = (...args) => {
        let [request, response] = args;
        try {
          let { render, rule } = response;
          let { options } = render;
          let { css, js, layer, less, mjs, injectionjs } = options;
          let { childs } = layer;

          let prm = handler.getprm(request);

          if (prm.pageno)
            render.view = `${pathname}/views/welcome${prm.pageno}.html`;
          else render.view = `${pathname}/views/welcome.html`;

          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };

      resolve({ module: lib, regulation });
    } catch (error) {
      reject(error);
    }
  });
};

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
    const { atomic, engine, components, dir, utils } = library;
    const { assist } = engine.compmgr;
    const { handler, concatobj, errhandler, mergeDeep } = utils;
    const { fs, path } = sys;
    const { ongoing } = cosetting;
    const { remote } = ongoing[compname];
    const { cdn } = remote;
    const [owncomp, regulation] = optional;
    const { viewspath: commonviews } = owncomp.common;

    let pagedata = JSON.parse(
      fs.readFileSync(path.join(pathname, "data", "pagedata.json"), "utf8")
    );

    try {
      let lib = utils.handler.restfulapi;
      let { GET, POST } = lib;

      GET["welcome"] = (...args) => {
        let [request, response] = args;
        try {
          let { render, rule } = response;
          let { options } = render;
          let { css, js, layer, less, mjs, injectionjs } = options;
          let { childs } = layer;

          let prm = handler.getprm(request);

          options.params = JSON.parse(
            assist.str_inject(
              JSON.stringify(pagedata.welcome.params[prm.pageno - 1]),
              [compname]
            )
          );

          mjs.atomic = [
            "/atom/smfetch/smfetch.js",
            "/atom/guimaker/guimaker.js",
          ];

          mjs.locally = [`/public/assets/js/wi.js`];

          if (prm.pageno)
            render.view = `${pathname}/views/welcome${prm.pageno}.html`;
          else render.view = `${pathname}/views/welcome.html`;

          injectionjs["variables"] = { compname };

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

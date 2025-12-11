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
    const { handler, concatobj, errhandler, mergeDeep, string2json } = utils;
    const { fs, path } = sys;
    const { ongoing } = cosetting;
    const { remote } = ongoing[compname];
    const { cdn } = remote;
    const [owncomp, regulation] = optional;
    const { viewspath: commonviews } = owncomp.common;

    let pagedata = JSON.parse(
      fs.readFileSync(path.join(pathname, "data", "pagedata.json"), "utf8")
    );
    // let apijson = JSON.parse(
    //   fs.readFileSync(path.join(pathname, "data", "login.json"), "utf8")
    // );

    // let eventjson = JSON.parse(
    //   fs.readFileSync(path.join(pathname, "data", "event.json"), "utf8")
    // );

    try {
      let lib = utils.handler.restfulapi;
      let { GET } = lib;

      GET["welcome"] = (...args) => {
        let [request, response] = args;
        try {
          let { render, rule } = response;
          let { options } = render;
          let { css, injectionjs } = options;

          let webengine = handler.webengine;

          let ren = JSON.parse(
            assist.str_inject(JSON.stringify(pagedata.welcome), [
              "Welcome Web Page - Real Images Page",
              compname,
              pathname,
              join(commonviews, "general.html"),
              join(commonviews, "general"),
            ])
          );
          render = mergeDeep(render, ren);

          webengine.path = `/${compname}/public/assets/js/`;
          webengine.load = {
            htmlcollection: { common: [] },
            htmlevent: { common: [] },
            htmlrender: { login: [], common: [], "oqc/main": [] },
            htmllogicflow: { common: [] },
            htmlworkflow: { login: [] },
          };

          webengine.load = guimaker.grabscript(
            [dir, `/${compname}`, `/components/${compname}/src`],
            webengine
          );

          webengine.trigger = eventjson;

          injectionjs["variables"] = { webengine, compname, apijson };

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

"use strict";

/**
 * Submodule of logicflow in ES Module type
 * @module page
 */

export default await (() => {
  let library, sys, interfaces, atom;
  return new Promise(async (resolve, reject) => {
    try {
      let lib = {
        load: (...args) => {
          const [obj, opt] = args;
          const [kernel, sysmodule, interfacing] = obj;
          library = kernel;
          sys = sysmodule;
          interfaces = interfacing;
          atom = opt;
        },
      };

      lib.showhide = (...args) => {
        const [showid, hideid, animate] = args;
        const { utils } = library;
        const { handler } = utils;
        let rtn = handler.dataformat;
        try {
          let show = document.querySelector(showid);
          let hide = document.querySelector(hideid);
          let loginbox = document.querySelector(".login-modal");
          let lastClass = loginbox.classList[loginbox.classList.length - 1];

          show.hidden = false;
          hide.hidden = true;

          if (loginbox.classList.length > 2) {
            loginbox.classList.remove(lastClass);
          }
          loginbox.classList.add(animate);
          return rtn;
        } catch (e) {
          rtn.code = -1;
          rtn.msg = e.toString();
        }
      };

      lib.redirect = async (...args) => {
        const [data, [url, action]] = args;
        const { utils } = library;
        const { handler } = utils;
        const { smfetch } = atom;
        const { compname } = injectionjs;
        let rtn = handler.dataformat;
        try {
          switch (action) {
            case "open":
              window.open(url);
              break;
            default:
              await smfetch.request({
                url: `/${compname}/externalfile/page/welcome`,
                method: "GET",
                async: false,
                ajax: false,
                data: { pageno: 2 },
              });
              break;
          }

          return rtn;
        } catch (e) {
          rtn.code = -1;
          rtn.msg = e.toString();
        }
      };

      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
})();

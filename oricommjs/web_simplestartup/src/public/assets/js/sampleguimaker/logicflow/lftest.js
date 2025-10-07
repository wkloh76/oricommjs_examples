"use strict";
/**
 * Submodule of logicflow in ES Module type
 * @module upload
 */

export default await (() => {
  let library, sys, interfaces, atom;
  return new Promise(async (resolve, reject) => {
    try {
      let lib = {};

      lib.load = (...args) => {
        const [obj, opt] = args;
        const [kernel, sysmodule, interfacing] = obj;
        library = kernel;
        sys = sysmodule;
        interfaces = interfacing;
        atom = opt;
      };

      lib.validate = (...args) => {
        const [param] = args;
        const { utils } = library;
        const { datatype, handler } = utils;
        let output = handler.dataformat;
        try {
          let dtype = datatype(param);
          if (dtype != "string") {
            output.code = -1;
            output.msg =
              "Unknown data type of param. The correct type is string!";
          } else output.data = param;
        } catch (error) {
        } finally {
          return output;
        }
      };

      lib.openpdf_memory = async (...args) => {
        const [param] = args;
        const { utils } = library;
        const { errhandler, handler } = utils;
        const { smfetch } = atom;
        let output = handler.dataformat;
        try {
          let { code, msg, redirected, data } = await smfetch.request({
            // url: "/web_test/api-signinup/submit-signin",
            url: "/web_simplestartup/testapi/downloadbuff",
            method: "GET",
            ajax: false,
            async: false,
            cache: true,
            download: true,
            option: {
              headers: {
                Accept: "application/pdf",
              },
            },
          });

          if (data) {
            let pdfWindow = window.open("about:blank");
            let url = URL.createObjectURL(data);
            pdfWindow.location.href = url; // and here, we finally forward the data to the new window
            pdfWindow.focus();
          } else {
            output.code = code;
            output.msg = msg;
          }
        } catch (error) {
          output = errhandler(error);
        } finally {
          return output;
        }
      };

      lib.openpdf_local = async (...args) => {
        const [param] = args;
        const { utils } = library;
        const { errhandler, handler } = utils;
        const { smfetch } = atom;
        let output = handler.dataformat;
        try {
          let { code, msg, redirected, data } = await smfetch.request({
            url: "/web_simplestartup/testapi/downloadbuff",
            method: "GET",
            ajax: false,
            async: false,
            cache: true,
            download: true,
            option: {
              headers: {
                Accept: "application/pdf",
              },
            },
          });

          if (data) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(data);
            link.download = "products.pdf"; // the default filename when the user saves the file
            link.click();
          } else {
            output.code = code;
            output.msg = msg;
          }
        } catch (error) {
          output = errhandler(error);
        } finally {
          return output;
        }
      };

      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
})();

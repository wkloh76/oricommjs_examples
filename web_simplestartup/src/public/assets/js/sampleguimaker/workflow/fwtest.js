"use strict";

/**
 * Submodule of quotation in ES Module type
 * @module workflow
 */

export default await (() => {
  let library, sys, interfaces, atom;
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

    lib.action_testclick = (...args) => {
      const [param] = args;
      const { utils } = library;
      const { handler } = utils;
      const { fmtseries } = handler;
      let input = fmtseries;

      try {
        input.err = [
          {
            name: "error_console",
            func: "lferror.failure",
          },
          {
            name: "error_display",
            func: "disp_error.error",
            pull: [["error_console.detail"]],
          },
        ];

        input.workflow = [
          {
            name: "get_function_name",
            func: "clgeneral.getfuncname",
            param: [[param]],
          },
          {
            name: "validate_param",
            func: "validate",
            pull: [["get_function_name.detail"]],
          },
          {
            name: "show_message",
            func: "disp_test.show",
            pull: [["validate_param.detail"]],
          },
        ];
        return [[input]];
      } catch (error) {
        console.log(error);
        return;
      }
    };

    lib.action_lcfile = (...args) => {
      const [param] = args;
      const { utils } = library;
      const { handler } = utils;

      try {
        let collection = handler.fmtseries;
        collection.workflow = [
          {
            name: "acceptance",
            func: "clgeneral.dorequired",
            param: [[param]],
            pull: [["shared.required"]],
            push: [["collection.acceptance"]],
          },
        ];

        let logicflow = handler.fmtseries;
        logicflow.workflow = [
          {
            name: "openpdf_local",
            func: "lftest.openpdf_local",
            pull: [["collection.acceptance"]],
          },
        ];

        return [[collection, logicflow]];
      } catch (error) {
        console.log(error);
        return;
      }
    };

    lib.action_memfile = (...args) => {
      const [param] = args;
      const { utils } = library;
      const { handler } = utils;
      const { fmtseries } = handler;
      let input = fmtseries;

      try {
        let collection = handler.fmtseries;
        collection.workflow = [
          {
            name: "acceptance",
            func: "clgeneral.dorequired",
            param: [[param]],
            pull: [["shared.required"]],
            push: [["collection.acceptance"]],
          },
        ];

        let logicflow = handler.fmtseries;
        logicflow.workflow = [
          {
            name: "openpdf_memory",
            func: "lftest.openpdf_memory",
            pull: [["collection.acceptance"]],
          },
        ];

        return [[collection, logicflow]];
      } catch (error) {
        console.log(error);
        return;
      }
    };
    return lib;
  } catch (error) {
    return error;
  }
})();

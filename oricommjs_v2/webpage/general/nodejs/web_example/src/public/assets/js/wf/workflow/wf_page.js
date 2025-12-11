"use strict";

/**
 * Submodule of workflow in ES Module type
 * @module login
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

    lib.show_form = () => {
      const { utils } = library;
      const { handler } = utils;
      try {
        let render = handler.fmtseries;
        render.workflow = [
          {
            name: "popup_form",
            func: "page.showhide",
            param: [[".login-modal", "#login-key", "animate__zoomIn"]],
          },
          {
            name: "focus",
            func: "form.focus",
            param: [["#username"]],
          },
        ];

        return [[render]];
      } catch (error) {
        console.log(error);
        return;
      }
    };

    lib.hide_form = () => {
      const { utils } = library;
      const { handler } = utils;
      try {
        let render = handler.fmtseries;
        render.workflow = [
          {
            name: "hide_form",
            func: "page.showhide",
            param: [["#login-key", ".login-modal", "animate__zoomOut"]],
          },
        ];

        return [[render]];
      } catch (error) {
        console.log(error);
        return;
      }
    };

    lib.login = () => {
      const { utils } = library;
      const { handler } = utils;
      let { compname } = injectionjs;
      try {
        let collection = handler.fmtseries;
        let logic = handler.fmtseries;
        let render = handler.fmtseries;

        collection.workflow = [
          {
            name: "input",
            func: "clgeneral.form_data",
            param: [["#form_login"]],
            push: [["input.detail"]],
          },
        ];

        logic.err = [{ name: "err", func: "swal.msg" }];
        logic.workflow = [
          {
            name: "validate",
            func: "validate.input",
            param: [
              [
                ["username", "password"],
                ["Please insert username & password", "Please insert password"],
                "#error",
              ],
            ],
            pull: [["input.detail"]],
          },
          {
            name: "login",
            func: "fetchapi.fetch",
            param: [["php.validate_user"]],
            pull: [["validate.detail"]],
            push: [["login.detail"]],
          },
        ];

        render.err = [{ name: "err", func: "swal.msg" }];
        render.workflow = [
          {
            name: "redirect",
            func: "page.redirect",
            pull: [["login.detail"]],
            param: [[`/${compname}/oqc/main`, "redirect"]],
          },
        ];

        return [[collection, logic, render]];
      } catch (error) {
        console.log(error);
        return;
      }
    };

    lib.show_keypad = (...args) => {
      const [evt] = args;
      const { utils } = library;
      const { handler } = utils;
      try {
        let collection = handler.fmtseries;
        let render = handler.fmtseries;

        collection.workflow = [
          {
            name: "get_evt",
            func: "clgeneral.evt_attr",
            param: [[evt]],
            push: [["get_evt.detail"]],
          },
        ];

        render.workflow = [
          {
            name: "keypad",
            func: "modaloqc.keypad",
            pull: [["get_evt.detail.id"]],
            param: [[".simple-keyboard"]],
          },
        ];

        return [[collection, render]];
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

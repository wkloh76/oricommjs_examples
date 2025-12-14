"use strict";

/**
 * Submodule of workflow in ES Module type
 * @module login
 */

export default await (() => {
  const { atomic, utils } = library;
  const { handler } = utils;
  try {
    let lib = {};

    lib.init = () => {
      try {
        let logic = handler.fmtseries;
        let render = handler.fmtseries;

        render.workflow = [
          {
            name: "div_system",
            func: "re_page.div_system",
            param: [["#describe", "#total_brew"]],
          },
        ];

        return [[render]];
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

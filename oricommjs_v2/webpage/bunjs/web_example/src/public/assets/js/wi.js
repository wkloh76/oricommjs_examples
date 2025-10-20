"use strict";

/**
 * Submodule of workflow in ES Module type
 * @module init
 */

export default await (async () => {
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

    lib.init = async () => {
      let msg = "I will start the init";
      alert(msg);
      console.log(msg);
    };

    lib.hh = () => {
      let hhh=wkloh()
      hhh.test("aaadadad");
    };

    return lib;
  } catch (error) {
    return error;
  }
})();
export function wkloh() {
  return {
    test: (test) => {
      alert(test);
    },
  };
}

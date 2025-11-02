"use strict";

/**
 * Submodule of workflow in ES Module type
 * @module init
 */

export default (() => {
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

    lib.hh = async () => {
      try {
        let { default: df, ...other } = await import("/library/utils.js");
        let utils = { ...df(), jptr: other.jptr(), handler: other.handler() };
        let { datatype, handler, jptr } = utils;
        let om = otherModule();
        let testdata = { family: { name: "Alice", gender: "female" } };
        const key = "my key";

        om.test(
          `'handler.dataformat' provide dataformt is  ${JSON.stringify(
            handler.dataformat,
            null,
            2
          )}`
        );

        om.test(`The testdata value is ${JSON.stringify(testdata, null, 2)}`);
        om.test(
          `'datatype' detect "testdata" data type is a ${datatype(testdata)}`
        );
        let [parent, property] = jptr.splitLast("/parent/arrayOrObject/1");
        om.test(
          `'jptr splitLast' success split last property(${property}) and root(${parent}`
        );

        let test1 = jptr.remove(testdata, "/family/gender");
        om.test(
          `'jptr remove' remove property(gender) and root value now is ${JSON.stringify(
            test1,
            null,
            2
          )}`
        );

        let test2 = jptr.set(testdata, "/family/name", "John");
        om.test(
          `'jptr set' replace name property value(Alice) to be value(${JSON.stringify(
            test2,
            null,
            2
          )}`
        );

        let test3 = jptr.get(testdata, "/family/name");
        om.test(
          `'jptr get' property value base name and the value is ${JSON.stringify(
            test3,
            null,
            2
          )}`
        );

        let test4 = jptr.join("root", key, "/to/target");
        om.test(
          `'jptr join' join success and the value is(${JSON.stringify(
            test4,
            null,
            2
          )}`
        );
      } catch (error) {
        alert(error);
      }
    };

    lib.redirect = async (...args) => {};

    return lib;
  } catch (error) {
    return error;
  }
})();
export const otherModule = () => {
  return {
    test: (test) => {
      alert(test);
    },
  };
};

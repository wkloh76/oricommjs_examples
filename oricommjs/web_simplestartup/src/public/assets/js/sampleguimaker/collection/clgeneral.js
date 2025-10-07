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

      lib.getfuncname = (...args) => {
        const [param] = args;
        const { utils } = library;
        const { handler } = utils;

        let output = handler.dataformat;
        let attrs = param.currentTarget.attributes;
        let func = attrs["func"].nodeValue;
        if (func) output.data = func;
        else {
          output.code = -1;
          output.msg = "Undefined function name!";
        }

        return output;
      };

      lib.dorequired = (...args) => {
        const [param] = args;
        const { utils } = library;
        const { errhandler, handler } = utils;
        let output = handler.dataformat;
        try {
          const { currentTarget, target } = param;
          let attrs = currentTarget.attributes;
          if (attrs["required"]) {
            output.data = { argv: {}, classlist: [], selector: [] };
            let { argv, selector } = output.data;
            if (currentTarget.value) output.data.value = currentTarget.value;
            if (currentTarget.classList.length > 0)
              output.data.classlist = [...currentTarget.classList];
            let required = attrs["required"].nodeValue.split(",");
            required.forEach((element) => {
              let [key, val, opt] = element.split(":");
              if (key == "selector") {
                switch (opt) {
                  case "parent":
                    selector.push(target.parentNode.querySelector(val));
                    break;
                  case "closest": // Jquery this.parents
                    let el = target.closest(val);
                    let classlst;
                    let attr;
                    if (el) {
                      attr = {};
                      classlst = [...el.classList];
                      for (let v of el.attributes) {
                        attr[v.name] = v.value;
                      }
                    }
                    selector.push({
                      el,
                      classlist: classlst,
                      attributes: attr,
                    });
                    // selector.push(target.closest(val));
                    break;
                  default:
                    selector.push(target.querySelector(val));
                    break;
                }
              } else {
                if (attrs[val]) argv[val] = attrs[val].nodeValue;
              }
            });
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

import policies from "../static/data/policies/policies.json";
import Policy from "./Policy.js";

export default (() => {

  return {

    get(controller) {
      let policy = policies.find((p) => p.controller === controller["@id"]);
      if (policy) {
        return new Policy(policy);
      } else {
        return undefined;
      }
    },

  }

})();
import policies from "../static/data/policies/policies.json";
import Policy from "./Policy.js";

export default (() => {

  return {

    get(controller, policyIDs = []) {
      let policy = policies.find((p) => p.controller === controller["@id"]);
      if (policy) {
        policy["@policySet"] = policy["@policySet"].filter((policy)=>{
          if(policyIDs.length === 0){
            return true
          }else{
            return policyIDs.includes(policy["@id"]);
          }
          
        })
        return new Policy(policy);
      } else {
        return undefined;
      }
    },

  }

})();
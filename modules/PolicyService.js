import policies from "../static/data/policies/policies.json";
import Policy from "./Policy.js";

export default (() => {

  return {

    get(controllerID, policyIDs = []) {
      let policy = policies.find((p) => p.controller === controllerID);
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
        console.log("return undefined")
        return undefined;
      }
    },

  }

})();
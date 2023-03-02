export default function(policy) {

  return {

    getMap(groupBy, attribute) {
      let policySet = policy["@policySet"];
      return policySet.reduce((map, policy) => {
        let groupByInstances = [];
        let attributeInstances = [];
    
        policy[groupBy].forEach((instance) => {
          if (instance.hasOwnProperty("@instance")) {
            groupByInstances.push(instance["@instance"]);
          } else if (instance.hasOwnProperty("@class")) {
            groupByInstances.push(instance["@class"]);
          }
        });
        policy[attribute].forEach((instance) => {
          if (instance.hasOwnProperty("@instance")) {
            attributeInstances.push(instance["@instance"]);
          } else if (instance.hasOwnProperty("@class")) {
            attributeInstances.push(instance["@class"]);
          }
        });
    
        groupByInstances.forEach((instance) => {
    
          if (!map.hasOwnProperty(instance)) {
            map[instance] = []
          }
    
          map[instance].push(...attributeInstances)
          // delete duplicates
          map[instance] = [...new Set(map[instance])];
    
          
        });
    
    
    
        return map
      }, {});
    }
    

  };

};

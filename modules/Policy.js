export default function (policy) {

  let push = (element, target) => {
    let key = (element["@instance"])
      ? "@instance"
      : "@class";

      target.push(element[key]);    
  }

  return {
    getIRIs(){
      let policySet = policy["@policySet"];
      let IRIs =  policySet.reduce((list, policy) => {

        policy["dpv:hasPersonalDataCategory"].forEach((instance) => {
          if (instance.hasOwnProperty("@instance")) {
            list.push(instance["@instance"]);
          } else if (instance.hasOwnProperty("@class")) {
            list.push(instance["@class"]);
          }
        });
        policy["dpv:hasPurpose"].forEach((instance) => {
          if (instance.hasOwnProperty("@instance")) {
            list.push(instance["@instance"]);
          } else if (instance.hasOwnProperty("@class")) {
            list.push(instance["@class"]);
          }
        });
        return list
      }, []);
      IRIs = [...new Set(IRIs)];
      return IRIs
    },

    getMap(groupBy, attribute) {
      let policySet = policy["@policySet"];
      return policySet.reduce((map, policy) => {
        if (policy["dpv:hasLegalBasis"].filter(e => e["@class"] === "dpv-gdpr:A6-1-a").length === 0) {
          return map
        }
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
    },

    getOtherLegalBasesMap(groupBy, attribute) {
      let policySet = policy["@policySet"];

      return policySet.reduce((map, policy) => {
        if (policy["dpv:hasLegalBasis"].filter(e => e["@class"] === "dpv-gdpr:A6-1-a").length > 0) {
          return map;
        }

        let groupByInstances = [];
        let attributeInstances = [];
        let otherlegalbases = policy["dpv:hasLegalBasis"].map(obj => obj["@class"]);

        policy[groupBy].forEach((e) => push(e, groupByInstances));
        policy[attribute].forEach((e) => push(e, attributeInstances));

        otherlegalbases.forEach((legalBasis) => {
          if (!map.hasOwnProperty(legalBasis)) {
            map[legalBasis] = {};
          }

          groupByInstances.forEach((instance) => {
            if (!map[legalBasis].hasOwnProperty(instance)) {
              map[legalBasis][instance] = [];
            }

            map[legalBasis][instance].push(...new Set(attributeInstances));
          })

        });

        return map
      }, {});
    }

  };
};

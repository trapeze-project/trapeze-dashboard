export default function(policy) {

  return {

    getPurposeMap() {
      return policy["@policySet"]
        .reduce((total, currentValue) => {
          const purpose = currentValue["dpv:hasPurpose"][0]["@class"]
          currentValue["dpv:hasPersonalDataCategory"]
            .forEach((item) => {
              if(item.hasOwnProperty("@class")){
              const personalDataCategory = item["@class"]
              if (!(purpose in total)) {
                total[purpose] = [];
              }
              total[purpose].push(personalDataCategory);
            }
          });
        
          return total;

      }, {});
    },

  };

};
import Policy from "./Policy.js";
import axios from "axios";

let getToken = () => {
  let kv = document.cookie
    .split('; ')
    .reduce((acc, val) => {
      let x = val.split('=');
      acc[x[0]] = x[1];
      return acc;
    }, {});
  return kv['auth._token.keycloak'].split('Bearer%20').pop();
}

// axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken();

export default (() => {
  return {
    async get(
      controllerPolicyRequestBody,
      consentPolicyRequestBody,
      policyIDs = []
    ) {
      let handle = (results) => {
        return results.map((result) => {
          if (result.status === "rejected") {
            return undefined;
          } else {
            console.log(result.value);
            return result.value.data.policy;
          }
        });
      };
      //fetchPolicy

      // currently hardcoded
      console.log("env file read "+JSON.stringify(process.env.HSA_HJSA))
      let url = process.env.READ_POLICY;

      let requestBodies = [controllerPolicyRequestBody]
      if(consentPolicyRequestBody!== undefined){
        requestBodies.push(consentPolicyRequestBody)
      }
      
      
      
      let requests = requestBodies.map((reqBody) => {
        
        return axios.post(url, reqBody, { headers: { 'Authorization': 'Bearer ' + getToken() }});
      });
      let results = await Promise.allSettled(requests);

      const [controllerPolicy, consentPolicy] = handle(results);

      if (controllerPolicy) {
        controllerPolicy["@policySet"] = controllerPolicy["@policySet"].filter(
          (policy) => {
            if (policyIDs.length === 0) {
              return true;
            } else {
              return policyIDs.includes(policy["@id"]);
            }
          }
        );
        return new Policy(controllerPolicy, consentPolicy);
      } else {
        return undefined;
      }
    },
    async update(newConsentPairs, policy) {
      let oldConsentPolicy = policy.getConsentPolicy()

      //////// debug  
      let oldConsentPairs = policy.getConsentsPairs()

      
      let policySet =[]
      
      let l1= oldConsentPairs.reduce(function (list, oldPair) { 

        let dataCategory = oldPair.dataCategory
        let purpose = oldPair.purpose
        for(const newPair of newConsentPairs){
          if(newPair.dataCategory === dataCategory && newPair.purpose === purpose){
            return list
          }
        }
        // add
        list.push({
          "dpv:hasPurpose": { "@class": purpose },
          "dpv:hasPersonalDataCategory": { "@class": dataCategory },
        })
        return list
      }, [])

      let l2= newConsentPairs.reduce(function (list,newPair) { 
        if(newPair.value === false) return list 
        let dataCategory = newPair.dataCategory
        let purpose = newPair.purpose
        list.push({
          "dpv:hasPurpose": { "@class": purpose },
          "dpv:hasPersonalDataCategory": { "@class": dataCategory },
        }) 
        return list
      },[])
      policySet.push(...l1)
      policySet.push(...l2)





      // console.log("submit policies"+ JSON.stringify(policy.getConsentsPairs()))



      ///////////////

      let url = process.env.UPDATE_POLICY;
      let body = JSON.parse(JSON.stringify(oldConsentPolicy));
      body.userID = [body.ownerID];
      body["@policySet"] = JSON.parse(JSON.stringify(policySet));

      delete body.created;
      delete body.modified;
      // add the timestamp when the user clicks on "submit changes" to the consent record
      // this code should be on the server side. 
      const now = new Date();
      const isoDateTime = now.toISOString();
      const xsdDateTime = isoDateTime.substring(0, 19);
      body["dpv:isIndicatedAtTime"]={
        "@value": xsdDateTime,
        "@type": "xsd:dateTime"
      }
      //

      let responseUpdateConsent = await axios
        .put(url, body, { headers: { 'Authorization': 'Bearer ' + getToken() }})
        .catch(function (err) {
          console.log("here is the error " + err);
        });
    },
    async createEmptyPolicy(userID, organization) {
      // return policy id
      let url = process.env.CREATE_POLICY;
      let reqBody = {
        userID,
        organization,
        title: "Policy 210",
        policyType: "consent",
        "@policySet": [],
        "dpv:hasConsentStatus": {
          "@class": "dpv:ConsentGiven",
        },
      };

      // add the timestamp when the user clicks on "submit changes" to the consent record
      // this code should be on the server side. 
      const now = new Date();
      const isoDateTime = now.toISOString();
      const xsdDateTime = isoDateTime.substring(0, 19);
      reqBody["dpv:isIndicatedAtTime"]={
        "@value": xsdDateTime,
        "@type": "xsd:dateTime"
      }
      //

      let responce = await axios.post(url, reqBody, { headers: { 'Authorization': 'Bearer ' + getToken() }}).catch(function (err) {
        console.log("here is the error " + err);
      });

      return responce.data.policy.id;
    },
  };
})();

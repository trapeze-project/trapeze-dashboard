import policies from "../static/data/policies/policies.json";
import Policy from "./Policy.js";
import axios from "axios";

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
      let url = "https://hyperledgerapitrapeze.atc.gr/ledger/readPolicy";

      let requests = [
        controllerPolicyRequestBody,
        consentPolicyRequestBody,
      ].map((reqBody) => {
        return axios.post(url, reqBody);
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
    async update(consentPairs, oldConsentPolicy) {
      let policySet = consentPairs.map((element) => {
        return {
          "dpv:hasPurpose": { "@class": element.purpose },
          "dpv:hasPersonalDataCategory": { "@class": element.dataCategory },
        };
      });

      let url = "https://hyperledgerapitrapeze.atc.gr/ledger/updatePolicy";
      let body = JSON.parse(JSON.stringify(oldConsentPolicy));
      body.userID = [body.ownerID];
      body["@policySet"] = JSON.parse(JSON.stringify(policySet));

      delete body.created;
      delete body.modified;

      let responseUpdateConsent = await axios
        .put(url, body)
        .catch(function (err) {
          console.log("here is the error " + err);
        });
    },
    async createEmptyPolicy(userID, organization) {
      // return policy id
      let url = "https://hyperledgerapitrapeze.atc.gr/ledger/createPolicy";
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
      let responce = await axios.post(url, reqBody).catch(function (err) {
        console.log("here is the error " + err);
      });

      return responce.data.policy.id;
    },
  };
})();

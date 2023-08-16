import axios from "axios";
import promise from "promise";

export default function (controllerPolicy, consentPolicy) {
  let push = (element, target) => {
    let key = element["@instance"] ? "@instance" : "@class";

    target.push(element[key]);
  };

  let createValueArray = (objectValue) => {
    let result = [];

    if (typeof objectValue === "string" || objectValue instanceof String) {
      result = [objectValue];
    } else if (Array.isArray(objectValue)) {
      let values = objectValue.map((element) => {
        if (typeof element === "string" || element instanceof String) {
          return element;
        } else if (typeof element === "object" && element !== null) {
          let key = Object.keys(element)[0];
          let value = Object.values(element)[0];
          return key === "@instance" ? `instance:${value}` : value;
        } else {
          return "";
        }
      });
      let valuesWithoutEmptyStrings = values.filter((element) => {
        return element !== "";
      });
      result = valuesWithoutEmptyStrings;
    } else if (typeof objectValue === "object" && objectValue !== null) {
      let key = Object.keys(objectValue)[0];
      let value = Object.values(objectValue)[0];
      result = key === "@instance" ? [`instance:${value}`] : [value];
    } else {
      result = [];
    }
    // console.log("result is"+JSON.stringify(result))

    addMissingPrefixToArrayElements(result);

    return result;
  };

  let addMissingPrefixToArrayElements = (arr, prefix = "dpv-owl:") => {
    for (let i = 0; i < arr.length; i++) {
      // console.log("value is"+JSON.stringify(arr[i]))
      if (!arr[i].includes(":")) {
        arr[i] = prefix + arr[i];
      }
    }
  };

  return {
    getControllerPolicy(){
      return controllerPolicy
    },
    getConsentPolicy(){
      return consentPolicy
    },
    getIRIs() {
      let policySet = controllerPolicy["@policySet"];
      let IRIs = policySet.reduce((list, policy) => {
        list.push(...createValueArray(policy["hasPersonalDataCategory"]));
        list.push(...createValueArray(policy["hasPurpose"]));

        return list;
      }, []);
      IRIs = [...new Set(IRIs)];
      return IRIs;
    },
    getDataCategoriesIRIs() {
      let policySet = controllerPolicy["@policySet"];
      let IRIs = policySet.reduce((list, policy) => {
        list.push(...createValueArray(policy["hasPersonalDataCategory"]));
        return list;
      }, []);
      IRIs = [...new Set(IRIs)];
      return IRIs;
    },
    async fetch_DPV_Labels_and_descriptions() {
      let result = {
        en: {
          labels: {},
          descriptions: {},
        },
        de: {
          labels: {},
          descriptions: {},
        },
        it: {
          labels: {},
          descriptions: {},
        },
        fr: {
          labels: {},
          descriptions: {},
        },
      };
      let compactedIRIs = this.getIRIs();

      let termDPVInfoRequests = compactedIRIs.map((compactedIRI) => {
        let term = compactedIRI.split(":")[1];

        return axios
          .get(
            `https://trapeze.imp.bg.ac.rs/knowledgebase/kb.php?action=dpv&lang=&term=${term}`
          )
          .catch(function (err) {
            console.log("here is the error " + compactedIRI);
            console.log(err);
          });
      });

      let termDPVInfoResponces = await promise.all(termDPVInfoRequests);

      termDPVInfoResponces.forEach((responce, index) => {
        let IRI = compactedIRIs[index];

        if (responce == undefined) {
          let languages = Object.keys(result);
          languages.forEach((lang) => {
            result[lang].labels[IRI] = IRI;
            result[lang].descriptions[IRI] = IRI + " unable to fetch defintion";
          });
          return;
        }

        let definitions =
          responce["data"][0]["http://www.w3.org/2004/02/skos/core#definition"];

        let labels =
          responce["data"][0]["http://www.w3.org/2004/02/skos/core#prefLabel"];

        definitions.forEach((langSpecificDefinition) => {
          let lang = langSpecificDefinition["@language"];
          let def = langSpecificDefinition["@value"];
          result[lang].descriptions[IRI] = def;
        });

        labels.forEach((langSpecificLabel) => {
          let lang = langSpecificLabel["@language"];
          let label = langSpecificLabel["@value"];
          result[lang].labels[IRI] = label;
        });

        // check for missing definitions and labels
        let langs = ["en", "de", "it", "fr"];
        langs.forEach((lang) => {
          if (!result[lang].labels.hasOwnProperty(IRI)) {
            result[lang].labels[IRI] = IRI;
          }
          if (!result[lang].descriptions.hasOwnProperty(IRI)) {
            result[lang].descriptions[
              IRI
            ] = `The translation for ${IRI} definition is not available.`;
          }
        });
      });
      return result;
    },
    async fetchUserChoices(controllerID) {
      let controllerPolicyPurposeMap = this.getMap(
        controllerPolicy,
        "hasPurpose",
        "hasPersonalDataCategory",
        "hasLegalBasis"
      );
      if (consentPolicy) {
        let consentPolicyPurposeMap = this.getMap(
          consentPolicy,
          "dpv:hasPurpose",
          "dpv:hasPersonalDataCategory",
          "dpv:hasConsentStatus"
        );
        console.log("consentPolicyPurposeMap"+JSON.stringify(consentPolicyPurposeMap))

        let choices = {};


        let purposes = Object.keys(controllerPolicyPurposeMap);
        for (let purpose of purposes) {
          let datacategories = controllerPolicyPurposeMap[purpose];

          choices[purpose] = {};
          for (let dataCategory of datacategories) {
            if (consentPolicyPurposeMap[purpose]?.includes(dataCategory)) {
              console.log("im turning sth to true");
              choices[purpose][dataCategory] = true;
            } else {
              choices[purpose][dataCategory] = false;
            }
          }
        }

        return choices;
      } else {
        let choicesAllOff = {};

        let purposes = Object.keys(controllerPolicyPurposeMap);
        for (let purpose of purposes) {
          let datacategories = controllerPolicyPurposeMap[purpose];

          choicesAllOff[purpose] = {};
          for (let dataCategory of datacategories) {
            choicesAllOff[purpose][dataCategory] = false;
          }
        }
        return choicesAllOff;
      }
    },

    getMap(fetchedPolicy, groupBy, attribute, filterOption) {
      let policySet = fetchedPolicy["@policySet"];
      let i = 0
      return policySet.reduce((map, policy) => {
        if (
          (filterOption === "hasLegalBasis" &&
            !createValueArray(policy["hasLegalBasis"]).includes(
              "dpv-gdpr:A6-1-a"
            )) ||
          (filterOption === "dpv:hasConsentStatus" &&
            !createValueArray(fetchedPolicy["dpv:hasConsentStatus"]).includes(
              "dpv:ConsentGiven"
            ))
        ) {
          if((filterOption === "dpv:hasConsentStatus" &&
          !createValueArray(policy["dpv:hasConsentStatus"]).includes(
            "dpv:ConsentGiven"
          ))){
            console.log("im exisiting")
          }
        
          return map;
        }

        let groupByInstances = createValueArray(policy[groupBy]);
        let attributeInstances = createValueArray(policy[attribute]);
        console.log("policy"+i+groupByInstances)
        console.log("policy"+i+attributeInstances)
        i++
        groupByInstances.forEach((instance) => {
          if (!map.hasOwnProperty(instance)) {
            map[instance] = [];
          }

          map[instance].push(...attributeInstances);
          // delete duplicates
          map[instance] = [...new Set(map[instance])];
        });

        return map;
      }, {});
    },

    getOtherLegalBasesMap(groupBy, attribute) {
      let policySet = controllerPolicy["@policySet"];

      return policySet.reduce((map, policy) => {
        if (
          createValueArray(policy["hasLegalBasis"]).includes("dpv-gdpr:A6-1-a")
        ) {
          return map;
        }

        let groupByInstances = createValueArray(policy[groupBy]);
        let attributeInstances = createValueArray(policy[attribute]);

        let otherlegalbases = createValueArray(policy["hasLegalBasis"]);

        otherlegalbases.forEach((legalBasis) => {
          if (!map.hasOwnProperty(legalBasis)) {
            map[legalBasis] = {};
          }

          groupByInstances.forEach((instance) => {
            if (!map[legalBasis].hasOwnProperty(instance)) {
              map[legalBasis][instance] = [];
            }

            map[legalBasis][instance].push(...new Set(attributeInstances));
          });
        });
        console.log("otherpurposemap" + JSON.stringify(map));

        return map;
      }, {});
    },
  };
}

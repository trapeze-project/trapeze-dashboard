import controller from "../static/data/controller/controller.json";

export default (() => {

  return {

    get(id) {
      return controller
        .find((c) => c["@id"] === id);
    },

  }

})();
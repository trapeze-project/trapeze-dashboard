import controller from "../static/data/controller/controller.json";

export default (() => {

  return {

    all() {
      return controller;
    },

    get(id) {
      return controller
        .find((c) => c["@id"] === id);
    },

    search(keyword) {
      if (keyword === "") {
        return controller;
      }

      return controller
        .filter((c) => {
          return c.name
            .toLowerCase()
            .includes(
              keyword.toLowerCase()
            );
        });
    },

  }

})();
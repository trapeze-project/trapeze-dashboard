import controller from "../static/data/controller/controller.json";

export default (() => {

  return {

    all() {      
      return controller
        .slice(0, 10);
    },

    get(id) {
      
      return controller
        .find((c) => c["@id"] === id);
    },

    search(keyword) {
      // console.log(controllerNew)
      if (keyword === "") {
        return this.all();
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
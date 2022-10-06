export default class CustomPaletteProvider {
  constructor(palette) {
    palette.registerProvider(this);
  }

  getPaletteEntries() {
    return function (entries) {
      //delete entries["create.exclusive-gateway"];
      //delete entries["create.intermediate-event"];
      delete entries["create.data-object"];
      delete entries["create.data-store"];
      return entries;
    };
  }
}

(CustomPaletteProvider as any).$inject = ["palette"];

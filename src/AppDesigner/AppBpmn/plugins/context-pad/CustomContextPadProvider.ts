export default class CustomContextPadProvider {
  constructor(contextPad) {
    contextPad.registerProvider(this);
  }

  getContextPadEntries() {
    return function (entries) {
      console.log("ContextPad 项目", entries)
      delete entries["append.condition-intermediate-event"];
      delete entries["append.signal-intermediate-event"];
      delete entries["append.receive-task"];
      return entries;
    };
  }
}

(CustomContextPadProvider as any).$inject = ["contextPad"];

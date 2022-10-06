export default class CustomReplaceMenuProvider {
  constructor(popupMenu, bpmnReplace) {
    popupMenu.registerProvider("bpmn-replace", this);
    this.replaceElement = bpmnReplace.replaceElement;
  }

  getPopupMenuHeaderEntries(element) {
    return function (entries) {
      return entries;
    };
  }

  getPopupMenuEntries(element) {
    const self = this;
    return function (entries) {
      delete entries["replace-with-conditional-start"]
      delete entries["replace-with-signal-start"]
      return entries;
    };
  }
}

CustomReplaceMenuProvider.$inject = ["popupMenu", "bpmnReplace"];

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
      console.log("Replace 菜单", entries)
      delete entries["replace-with-conditional-start"]
      delete entries["replace-with-signal-start"]

      delete entries["replace-with-compensation-intermediate-throw"]
      delete entries["replace-with-conditional-intermediate-catch"]
      delete entries["replace-with-escalation-intermediate-throw"]
      delete entries["replace-with-escalation-intermediate-catch"]
      delete entries["replace-with-link-intermediate-catch"]
      delete entries["replace-with-link-intermediate-throw"]
      delete entries["replace-with-signal-intermediate-catch"]
      delete entries["replace-with-signal-intermediate-throw"]

      return entries;
    };
  }
}

CustomReplaceMenuProvider.$inject = ["popupMenu", "bpmnReplace"];

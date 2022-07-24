import { ComponentCategory } from "src/types";
import Card from "./Card";
import { locales } from "./locales";
// import { Page } from "./Page";

export const Layout: ComponentCategory = {
  name:"Layout",
  locales,
  components:[
    Card,
    //Page,
  ]
}
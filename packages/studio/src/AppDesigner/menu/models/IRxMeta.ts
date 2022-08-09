export interface IRxMeta{
  name:string;
  props?:{
    [key:string]: any
  };
  children?: IRxMeta[],
  [key:string]:any;
}
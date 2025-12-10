export interface GroupMainFilterResponse {
  groupMainName: string;
  idProductGroup: number[];
}
export interface SubgroupFilterResponse {
  oneLvlGroupName: string;
  idOneLvlGroupProduct: number[];
}
export interface SubSubGroupFilterResponse {
  twoLvlGroupName: string;
  idTwoLvlGroupProduct: number[];
}
export interface SubSubSubGroupFilterResponse {
  threeLvlGroupName: string;
  idThreeLvlGroupProduct: number[];
}
export interface NomenklaturaFilterResponse {
  productName: string;
  idProduct: number[];
}

import OneClick from "./oneClick";

export default interface OneClickApp {
  readonly name: string;
  readonly id: string;
  readonly owner: string;
  readonly createdAt: any;
  readonly oneClicks?: Array<OneClick>;
}

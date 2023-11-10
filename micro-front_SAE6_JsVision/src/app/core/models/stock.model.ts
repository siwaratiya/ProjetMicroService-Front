import {ResourceModel} from "../common/resource.model";
import {Type_product} from "./constant/type_product.model";
import {State} from "./constant/state.model";
import {ProductModel} from "./product.model";

export class StockModel extends ResourceModel<StockModel> {

  id?: any;
  nbProduct?: number;
  unit?: string;
  total_quantity?: number;
  storage?: number;
  free_storage?: number;
  used_storage?: number;
  LocalDate?: Date;
  location?: string;
  type_product?:Type_product;
  state?:State;
  products?:ProductModel[];

  constructor(model?: Partial<StockModel>) {
    super(model);
  }
}

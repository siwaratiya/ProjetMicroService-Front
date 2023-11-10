import {ResourceModel} from "../common/resource.model";


export class CommandeModel extends ResourceModel<CommandeModel> {


  id?: any;
  notice?: string;
  quantity_product?: number;
  nbPoduct?: number;
  date?:string;
  //date?:Date;
  total_price?: number;
  idA?:number;


  constructor(model?: Partial<CommandeModel>) {
    super(model);
  }







}

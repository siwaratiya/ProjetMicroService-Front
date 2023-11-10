import {ResourceModel} from "../common/resource.model";

export class TestModel extends ResourceModel<TestModel>{
  idTest?:any;
  nameTest?:string;
  price?:number;

  constructor(model?: Partial<TestModel>) {
    super(model);
  }

}

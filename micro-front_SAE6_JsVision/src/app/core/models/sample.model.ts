import { ResourceModel } from "../common/resource.model";

export class SampleModel extends ResourceModel<SampleModel>{
    idSample?:any;
    date?:string;
   numSample?:number;

    constructor(model?: Partial<SampleModel>) {
        super(model);
      }

}

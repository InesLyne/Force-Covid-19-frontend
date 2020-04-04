import { LineAllocationModel } from './line-allocation.model';
export class Allocation {
    id: number;
    status: string;
    created: string;
    updated: string;
    confirmationCode: string;
    lienAllocations: LineAllocationModel[];
    beneficiary: string;
    deliverer: string;
    distributor: string;
    constructor(){
        this.status='created';
        this.distributor='undefined';
        this.deliverer='undifined';
        this.confirmationCode='undifined';
    }

}

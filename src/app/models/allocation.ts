import { LineAllocationModel } from './line-allocation.model';
export class Allocation {
    id: number;
    status: number;
    created: string;
    updated: string;
    confirmationCode: string;
    lienAllocations: LineAllocationModel[];
    beneficiary: string;
    deliverer: string;
    distributor: string;
    constructor(){}

}

export class SearchCriteria {
    public key?: string;
    public operation?: string;
    public value?: Object;
    public page: number = 1;
    public size: number = 10;
    public orderBy: string;
    public orderDirection: number = 1;
    public categories?: string;
    public searchKey?: string;
}
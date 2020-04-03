import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Allocation } from 'src/app/models/allocation';
import { SearchCriteria } from 'src/app/models/search-critaria';
import { AllocationService } from 'src/app/services/allocation.service';
import { Subject, Subscription } from 'rxjs';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-list-allocation',
  templateUrl: './list-allocation.component.html',
  styleUrls: ['./list-allocation.component.css']
})
export class ListAllocationComponent implements OnInit {
  //@Input() selectedItems: Allocation[];
  @Input() selectedRows: any;
  @Output() displayChange = new EventEmitter<boolean>();
  loading: boolean = true;
  errorMsg: any;
  successMsg: any;
  allocations: Allocation[]=[];
  subdivisions: any;

  constructor(private allocationService: AllocationService, private global: GlobalService) { }

  ngOnInit(): void {
    console.log(this.selectedRows)
    this.subdivisions = [
      {label: 'Selectionnner item', value: null},
      {label: 'Item 1', value: '/api/subdivisions/450'},
      {label: 'Item 2', value: '/api/subdivisions/483'},
      {label: 'Item 3', value: '/api/subdivisions/496'},
      {label: 'Item 4', value: '/api/subdivisions/423'},
      {label: 'Item 5', value: '/api/subdivisions/480'}
  ];
  }



  onSubmit(){

  }

  onPushAllocation(){
    let allocation: Allocation= new Allocation();
    this.allocations.push(allocation);
  }

  onRemoveAllocation(index: number){
    this.allocations.splice(index,1);
  }

  onDialogHide() {
    this.displayChange.emit(false);
  }
  
  ngOnDestroy() {
    this.allocations=[];
    this.displayChange.unsubscribe();
  }

}

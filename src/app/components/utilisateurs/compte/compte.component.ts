import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
// import { MessageService, SelectItem } from 'primeng/api/public_api';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css'],
  // providers: [MessageService]
})
export class CompteComponent implements OnInit {

  user: User = new User();
  visible: boolean = false;
  visibleForm: boolean = true;
  userform: FormGroup;

  submitted: boolean;

  // genders: SelectItem[];

  description: string;

  constructor(private fb: FormBuilder,
    //  private messageService: MessageService
                ) {

    this.user = { id: 0,
    username: 'moussaDev',
    salt: '',
    password: '0000',
    roles: '',
    type: '',
    firstName: 'Moussa',
    lastName: 'Sall',
    phoneNumber: '775545565',
    identityNumber: '76765676897818',
    email:'user@gmail.com',
    lastLogin: '',
    isActive: '',
    }
  }

  ngOnInit(): void {
    this.userform = this.fb.group({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'phoneNumber': new FormControl('', Validators.required),
      'identityNumber': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
  });

  }

  showInfos () {
    this.visible = true;
    this.visibleForm=true;
  }


  clickModifier() {
    this.visible=false;
    this.visibleForm=false;
  }

  onSubmit(value: string) {
    this.submitted = true;
    // this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted'});
}

get diagnostic() { return JSON.stringify(this.userform.value); }

}

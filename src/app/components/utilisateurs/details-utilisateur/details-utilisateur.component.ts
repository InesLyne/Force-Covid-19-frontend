import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-details-utilisateur',
  templateUrl: './details-utilisateur.component.html',
  styleUrls: ['./details-utilisateur.component.css'],
  providers: [MessageService]
})
export class DetailsUtilisateurComponent implements OnInit {


  user: User = new User();
  visibleInfo: boolean = true;
  visibleForm: boolean = false;
  userform: FormGroup;

  submitted: boolean;

  // genders: SelectItem[];

  description: string;

  constructor(private fb: FormBuilder, private userService: UserService,
              private messageService: MessageService
                ) {

    this.user = { 
      id: 0,
    username: 'moussaDev',
    password: '0000',
    roles: [],
    type: '',
    firstName: 'Moussa',
    lastName: 'Sall',
    phoneNumber: '775545565',
    identityNumber: '76765676897818',
    email:'user@gmail.com',
    lastLogin: '',
    isActive: '',
    fullname:'Moussa Dev'
    }
  }

  ngOnInit(): void {
    this.userform = this.fb.group({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'phoneNumber': new FormControl('', Validators.required),
      'identityNumber': new FormControl('', Validators.required),
      'email': new FormControl('bad@', Validators.email),
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
  });

  }




  clickModifier() {
    this.visibleInfo=false;
    this.visibleForm=true;
  }

  onSubmit(user) {
    this.updateUser(user);
    this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted'});
}

get diagnostic() { return JSON.stringify(this.userform.value); }

 updateUser(userUpdate: User) {
   this.userService.updateUser(userUpdate).subscribe(
     data => {
       console.log(data)
     }
   )
 }

}

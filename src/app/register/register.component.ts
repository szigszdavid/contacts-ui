import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    fullName: ['', [Validators.required]],
    selectedPrivileges: new FormArray([]),
  });

  privileges: Array<any> = [
    { name: 'LIST', value: 1 },
    { name: 'CREATE', value: 2 },
    { name: 'MODIFY', value: 3 },
    { name: 'DELETE', value: 4 }
  ];
  message: string;

  get username(): AbstractControl {
    return this.form.get('username')!;
  }
  get password(): AbstractControl {
    return this.form.get('password')!;
  }
  get fullName(): AbstractControl {
    return this.form.get('fullName')!;
  }

  formArray : number[] = []
  

  onCheckboxChange(event : any) {
 
    console.log(event.target.value);

    if(event.target.checked){
    
      
      this.formArray.push(parseInt(event.target.value))
    }
    else{

      this.formArray = this.formArray.filter((element : number) => {
          element != event.target.value
      })
    }
  }

  async onSubmit(): Promise<void> {
    try {
      console.log(this.formArray);
      
      await this.authService.register(this.username.value, this.password.value, this.fullName.value, this.formArray);
      
      if (this.authService.redirectUrl) {
        this.router.navigate([this.authService.redirectUrl]);
        
      } else {
        this.router.navigate(['/contacts']);
      }
    } catch (e) {
      this.message = 'Cannot registers!';
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {

    newPassword: FormGroup 
    constructor(private fb :FormBuilder) {
      this.newPassword = this.fb.group({
        newPassword1: ['', Validators.required],
        newPassword2: ['', Validators.required],
      })
    }

    validatePassword(){
      
    }
}

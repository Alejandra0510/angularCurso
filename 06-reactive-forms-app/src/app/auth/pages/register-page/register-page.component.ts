import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})

export class RegisterPageComponent {

  //! Tarea:
  // myForm
  /**
   * name -> obligatorio
   * email -> obligatorio y un email (validators.email?)
   * username -> obligatorio, minlength 6
   * password -> obligatorio, minlength 6
   * password2 -> obligatorio (confirmPassword seria un mejor nombre)
   */

  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern( this.formUtils.namePattern )]],
    email: [
      '',
      [Validators.required, Validators.pattern( this.formUtils.emailPattern )],
      [this.formUtils.checkingServerResponse],
    ],
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.formUtils.notOnlySpacesPattern),
        FormUtils.notStrider
      ]
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', Validators.required]
  }, {
    validators: [
      // this.isFieldOneEgualFieldTwo('password', 'password2'),
      this.formUtils.isFieldOneEgualFieldTwo('password', 'password2'),
    ]
  });

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }




}

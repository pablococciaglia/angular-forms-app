import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export default class RegisterPage {
  private fb = inject(FormBuilder);

  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group(
    {
      name: [null, [Validators.required, Validators.pattern(this.formUtils.namePattern)]],
      email: [
        null,
        [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
        [this.formUtils.checkingServerResponse],
      ],
      username: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formUtils.notOnlySpacesPattern),
          this.formUtils.notPabloUsers,
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.formUtils.passwordPattern),
        ],
      ],
      confirmPassword: [null, [Validators.required]],
    },
    {
      validators: [this.formUtils.equalMatchValidator('password', 'confirmPassword')],
    }
  );

  onSubmit() {
    this.myForm.markAllAsTouched();
    if (!this.myForm.valid) {
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset();
  }
}

import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormUtils } from '../../../utils/form-utils';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic.html',
})
export default class BasicPage {
  formUtils = FormUtils;
  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });
  // myForm = new FormGroup({
  //   name: new FormControl('', [sync validators], [async validators]),
  //   price: new FormControl(0, [sync validators], [async validators]),
  //   inStorage: new FormControl(0, [sync validators], [async validators]),
  // });

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset();
  }
}

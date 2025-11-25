import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormUtils } from '../../../utils/form-utils';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'dyncamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dyncamic.html',
})
export default class DyncamicPage {
  formUtils = FormUtils;
  private fb = inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([], Validators.minLength(3)),
  });

  /* isoleted logic */
  newFavorite = new FormControl('', [Validators.required, Validators.minLength(3)]);

  get favoriteGamesArray() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites() {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    this.favoriteGamesArray.push(this.fb.control(newGame, Validators.required));
    this.newFavorite.reset();
  }

  deleteFromFavorites(index: number) {
    console.log(index);
    this.favoriteGamesArray.removeAt(index);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
    this.myForm.reset();
  }
}

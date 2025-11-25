import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

async function justWait() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}
export class FormUtils {
  static passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$';
  static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextErrors(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `Minimum length is ${errors['minlength'].requiredLength} caracters`;
        case 'emailTaken':
          return 'There already is a user with this e-mail registered';
        case 'min':
          return `Minimum value is ${errors['min'].min}`;
        case 'passwordMismatch':
          return 'Passwords do not match';
        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'The email has not a valid format';
          }
          if (errors['pattern'].requiredPattern === FormUtils.notOnlySpacesPattern) {
            return 'The username has not a valid format';
          }
          if (errors['pattern'].requiredPattern === FormUtils.passwordPattern) {
            return 'The should have at least 1 number, 1 lowercase letter, 1 capital letter and 1 symbol';
          }
          if (errors['pattern'].requiredPattern === FormUtils.namePattern) {
            return 'The name and lastname has not the right format';
          }
          return 'It has not the right format';
        case 'notPablo':
          return 'There is only one';
        default:
          return `Not controlled error ${key}`;
      }
    }
    return null;
  }

  static isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors ? form.controls[field].touched : null;
  }

  static getfieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field].errors) return null;
    const errors = form.controls[field].errors;
    return this.getTextErrors(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  static getfieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (!formArray.controls[index].errors) return null;
    const errors = formArray.controls[index].errors;
    return this.getTextErrors(errors);
  }

  static equalMatchValidator(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const fieldValue = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;
      return fieldValue !== fieldValue2 ? { passwordMismatch: true } : null;
    };
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await justWait();
    const formValue = control.value;
    if (formValue === 'cocciaglia@gmail.com') {
      return {
        emailTaken: true,
      };
    }
    return null;
  }

  static notPabloUsers(control: AbstractControl): ValidationErrors | null {
    const formValue = control.value;
    if (formValue === 'pablococciaglia') {
      return {
        notPablo: true,
      };
    }
    return null;
  }
}

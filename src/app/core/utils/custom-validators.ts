import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {catchError, map, of, switchMap, timer} from "rxjs";
import {isPresent} from "./lang";
import {UserService} from "../../modules/profile/pages/service/user.service";


export class CustomValidators {

  /**
   * @Returns Valida la expresión para contraseñas
   * @param pattern
   * @param error
   */


  static confirmPassword(control: AbstractControl): ValidationErrors | null {
    return confirmPasswordValidator(control);
  }


}

export function confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.parent?.get('password')?.value;
  const passwordConfirmed = control.value;
  if (!passwordConfirmed) {
    return null;
  }
  return password !== passwordConfirmed ? {confirmPassword: true} : null;
}



export function existUserName(_userService: UserService, editingNameUser: string | null = null, debounce = 300): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const username = control.value;

    if (username == editingNameUser) {
      return of(null);
    }

    return timer(debounce).pipe(
      switchMap(() => _userService.existUserByName(username)),
      map(userExists => (userExists ? {usernameExists: true} : null)),
      catchError(() => of(null))
    );
  };
}

export function existDocumentNumber(_userService: UserService, editingDocumentNumber: string | null = null, debounce = 300): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const documentNumber = control.value;

    if (documentNumber == editingDocumentNumber) {
      return of(null);
    }

    return timer(debounce).pipe(
      switchMap(() => _userService.existPersonDocument(documentNumber)),
      map(documentNumberExists => (documentNumberExists ? {documentNumberExists: true} : null)),
      catchError(() => of(null))
    );
  };
}

export function existPersonEmail(_userService: UserService, editingPersonEmail: string | null = null, debounce = 300): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const personEmail = control.value;

    if (personEmail == editingPersonEmail) {
      return of(null);
    }

    return timer(debounce).pipe(
      switchMap(() => _userService.existPersonEmail(personEmail)),
      map(personEmailExists => (personEmailExists ? {personEmailExists: true} : null)),
      catchError(() => of(null))
    );
  };
}




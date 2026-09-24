import { LowerCasePipe } from '@angular/common';
import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';


async function sleep() {
  return new Promise( resolve => {
    setTimeout(() => {
      resolve(true)
    }, 2500);
  })
}


export class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextErrors( errors: ValidationErrors){
    for( const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return "Este campo es requerido";

        case 'minlength':
          return `Mínimo de ${ errors['minlength'].requiredLength } caracteres.`

        case 'min':
          return `Valor mínimo de ${ errors['min'].min }`

        case 'email':
          return `Ingrese un formato de correo válido.`

        case 'emailTaken':
          return 'El correo electrónico ya está siendo ocupado por otro usuario'

        case 'pattern':
          if( errors['pattern'].requiredPattern == FormUtils.emailPattern ){
            return 'El valor ingresado no parece un correo electrónico'
          }
        return 'Error de patrón contra expresión regular'

        case 'noStrider':
          return 'El username no puede ser Strider';

        default:
          return `Error de validación no controlado ${ key }`
      }
    }
    return null;
  }

  static isValideField( form: FormGroup, fieldName: string ): boolean | null {
    return (
      !!form.controls[fieldName].errors &&
      form.controls[fieldName].touched
    );
  }


  static getFieldError(form: FormGroup, fieldName: string ): string | null {
    if(!form.controls[fieldName]) return null;
    const errors = form.controls[fieldName].errors ?? {};
    return FormUtils.getTextErrors(errors);
  }


  static isValidFieldArray( formArray: FormArray, index: number){
    return(
      !!formArray.controls[index].errors && formArray.controls[index].touched
    );
  }


  static getFieldErrorByArray( formArray: FormArray, position: number): string | null {
    if(formArray.controls.length === 0) return null;
    const errors = formArray.controls[position].errors ?? {};
    return FormUtils.getTextErrors(errors);
  }


  static isFieldOneEgualFieldTwo( field: string, field2: string){
    return ( FormGroup: AbstractControl) => {
      const fieldValue = FormGroup.get(field)?.value;
      const field2Value = FormGroup.get(field2)?.value;

      return (fieldValue === field2Value) ? null : { fieldsNotEqual: true};
    };
  }


  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null>{
    await sleep();
    const formValue = control.value;

    if(formValue === 'hola@mundo.com'){
      return{
        emailTaken: true
      }
    }
    return null;
  }


  static notStrider(control: AbstractControl): ValidationErrors | null{
    const username = control.value;
    return(username === 'strider' || username === 'Strider') ? { noStrider: true } : null;

    // { noStrider: true } ?? null
  }
}

import { AbstractControl, ValidationErrors } from "@angular/forms";

export class ImageValidator{
  static isValidExtension(control:AbstractControl):ValidationErrors | null{
    const value=control.value as string;

    if(value.endsWith(".jpg") || value.endsWith("jpeg") || value.endsWith(".png")){
      return null;
    }
    else{
      return {
        wrongExtension:true
      }
    }
  }
}

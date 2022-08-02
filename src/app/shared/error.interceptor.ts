import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(req).pipe(
      catchError((response:HttpErrorResponse)=>{
        let message="Bir hata oluştu"

        if(!navigator.onLine){
          message="Lütfen internet bağlantınızı kontrol ediniz"
          return throwError(message)
        }

        if(response.error.error){
          if(response.status===401){
            message="Yetkiniz yok"

            return throwError(message)
          }
        }

        if (response.error.error) {
          switch (response.error.error.message) {
            case "EMAIL_EXISTS":
              message = "Bu mail adresi zaten kullanılıyor";
              break;

            case "EMAIL_NOT_FOUND":
              message = "Email bulunamadı"
              break;

            case "INVALID_PASSWORD":
              message = "Hatalı parola girdiniz"
              break;
          }
        }

        return throwError(message)
      })
    )
  }

}

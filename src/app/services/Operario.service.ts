import { Inject, Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class OperarioService {

  private key : string
   
  constructor() {
    this.key = environment.MI_CLAVE_SECRETA;
  }

  encrypt(data: string): string {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString();
    return encryptedData;
  }

  decrypt(encryptedData: string): any {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, this.key);
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }          
}

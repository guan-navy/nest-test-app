
import { Inject, Injectable } from '@nestjs/common';
@Injectable()
export class AppJapanService {
    constructor(@Inject('APP_NAME') private readonly name:string,
@Inject('MESSAGE') private readonly message:string
){}

  getHello(): string {
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_PORT);
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PASSWORD);
    console.log(process.env.DB_NAME);
    console.log(process.env.SUPPORT_EMAIL);

    

    
    return `日本话from ${this.name} ${this.message}`;
  }
   
}
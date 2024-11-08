import { registerAs } from "@nestjs/config"
import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { Anttendee } from "src/events/attendee.entity"
import { Event } from "src/events/event.entity"

export default  registerAs(
    'orm.config',
    
    
    ():TypeOrmModuleOptions=>{
  return {
    type:'mysql',
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    entities:[Event,Anttendee],
    synchronize:true
  }
})
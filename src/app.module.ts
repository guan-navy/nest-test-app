import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { EventsModule } from './events/events.module';
import { Event } from './events/event.entity';
import { AppJapanService } from './app.japan.service';
import { AppDummy } from './app.dummy';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load:[ormConfig],
      expandVariables:true

    }),
    TypeOrmModule.forRootAsync({
      useFactory:process.env.NODE_ENV==='production'?ormConfigProd:ormConfig

    }),
  
  EventsModule,
],
  controllers: [AppController ],
  providers: [{
    provide:AppService,
    useClass:AppJapanService
  },{
    provide:'APP_NAME',
    useValue:'Nest Events Backend'
  },{
    provide:'MESSAGE',
    inject:[AppDummy],

    useFactory:(app)=>{
      return `${app.dummy()} factory`
    }
  },AppDummy]
})
export class AppModule {}

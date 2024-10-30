import { Body, Controller, Delete, Get, HttpCode, Logger, NotFoundException, Param, ParseIntPipe, Patch, Post, ValidationPipe } from "@nestjs/common";
import { CreateEvetntDto } from "./create-events.dto";
import { UpdateEventDto } from "./update-events.dto";
import { Event } from "./event.entity";
import {  Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Controller('/events')
export class EventsController{
    private readonly logger = new Logger(EventsController.name);
    constructor(
        @InjectRepository(Event)
        private readonly repository:Repository<Event>){
        
    }
    private events:Event[] = [];
    @Get()
   async findAll() {
    this.logger.log('Fetching all events');
    const events = await this.repository.find();
    this.logger.debug(`Fetched all events ${events.length}`);


        return events

    }
    @Get('/practice')
    async practice() {
        return await this.repository.find({
            select:['id','when'],
            where:[
                // {
                //     id:MoreThan(2),
                //    when:MoreThan(new Date('2021-02-12T13:00:00'))
                // },
                // {
                //     description:Like('%meet%')
                // }

            ],
            order:{
               when:'DESC'
            }


        });
    }
    @Get(':id')
    async findOne(@Param('id',ParseIntPipe) id:number) {
        console.log(typeof id);
        const event = await this.repository.findOneBy({id});
        if(!event){
            throw new NotFoundException('Id is Not found');
        }
        return event;
    }
    
    @Post()
   async create(@Body(new ValidationPipe({groups:['create']})) input:CreateEvetntDto){
    
       return await this.repository.save({
          ...input,
           when:input.when?new Date(input.when):new Date(),
          
       });

    }
    @Patch(':id')
   async update(@Param('id') id ,@Body(new ValidationPipe({groups:['update']})) input:UpdateEventDto){
       const event = await this.repository.findOneBy({id:parseInt(id)});
       return await this.repository.save({
       ...event,
       ...input,
        when:input.when?new Date(input.when):event.when,
       });
    }
    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id ,@Body() input){
        this.events = this.events.filter((event) => event.id!== parseInt(id));
    }

}
import { Body, Controller, Delete, Get, HttpCode, Logger, NotFoundException, Param, ParseIntPipe, Patch, Post, ValidationPipe } from "@nestjs/common";
import { CreateEvetntDto } from "./create-events.dto";
import { UpdateEventDto } from "./update-events.dto";
import { Event } from "./event.entity";
import {  Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Anttendee } from "./attendee.entity";

@Controller('/events')
export class EventsController{
    private readonly logger = new Logger(EventsController.name);
    constructor(
        @InjectRepository(Event)
        private readonly repository:Repository<Event>,
        @InjectRepository(Anttendee)
        private readonly anttendeeRepository:Repository<Anttendee>
    ){
        
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
    @Get('/practice2')
    async practice2() {
        const event = await this.repository.findOne({
            where: { id: 1 }, // 这里使用 where 条件来查找特定 ID 的事件
            loadEagerRelations: false, // 加载关联关系
          });
       return event;
    }
    @Get('/practice3')
    async practice3() {
        const event = await this.repository.findOneBy({
            id: 1, // 这里使用 where 条件来查找特定 ID 的事件
        })
        const anttendee= new Anttendee();
        anttendee.name = 'an';
        anttendee.description = 'an';
        anttendee.event = event;
        anttendee.when = new Date();
        anttendee.address = 'an';
        await this.anttendeeRepository.save(anttendee);
        return event;

    }
    @Get('/practice4')
    async practice4() {
        const event = await this.repository.findOne({
            where: { id: 1 }, // 这里使用 where 条件来查找特定 ID 的事件
            relations: ['anttendees'], // 加载关联关系

        })
        const anttendee= new Anttendee();
        anttendee.name = '级联测试';
        anttendee.description = 'an';
        // anttendee.event = event;
        anttendee.when = new Date();
        anttendee.address = 'an';
       event.anttendees.push(anttendee);
       event.anttendees =[]

        await this.repository.save(event);
        return event;

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
import { PartialType } from "@nestjs/mapped-types";
import { CreateEvetntDto } from "./create-events.dto";

export class UpdateEventDto extends PartialType( CreateEvetntDto){
    
}
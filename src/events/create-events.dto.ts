import { IsDateString, IsString, Length } from "class-validator";

export class CreateEvetntDto {
    @IsString()
    @Length(5, 255,{
        message:'Name must be between 5 and 255 characters'
    })
    name: string;
    @IsString()
    @Length(5, 255)
    description: string;
  
    when: string;
    @IsString()
    @Length(5, 255,{groups:['create']})
    @Length(6,255,{groups:['update']})
    address: string;
}
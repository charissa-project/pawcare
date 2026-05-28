import {
 IsInt,
 IsNotEmpty
} from 'class-validator';

import {
 ApiProperty
} from '@nestjs/swagger';

export class CreateDoctorDto{

 @ApiProperty()
 @IsInt()

 userId:number;

 @ApiProperty()
 @IsNotEmpty()

 specialization:string;

 @ApiProperty()
 @IsInt()

 experience:number;

 @ApiProperty()
 @IsNotEmpty()

 schedule:string;

}
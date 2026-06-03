import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
export declare class PetsController {
    private readonly petsService;
    constructor(petsService: PetsService);
    create(userId: number, dto: CreatePetDto, file: Express.Multer.File): any;
    findAll(userId: number): any;
    findAllAdmin(): any;
    findOne(id: number, userId: number): any;
    update(id: number, userId: number, dto: UpdatePetDto): any;
    remove(id: number, userId: number): any;
    uploadPhoto(id: number, userId: number, file: Express.Multer.File): any;
}

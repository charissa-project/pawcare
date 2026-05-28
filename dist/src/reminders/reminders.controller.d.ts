import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
export declare class RemindersController {
    private readonly remindersService;
    constructor(remindersService: RemindersService);
    create(userId: number, dto: CreateReminderDto): Promise<{
        id: number;
        petId: number;
        type: string;
        title: string;
        reminderDate: Date;
        isDone: boolean;
    }>;
    findAll(userId: number): Promise<({
        pet: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            userId: number;
            species: string;
            breed: string;
            age: number;
            gender: string;
            weight: number;
            healthStatus: string;
            lastVaccine: Date | null;
            nextVaccine: Date | null;
        };
    } & {
        id: number;
        petId: number;
        type: string;
        title: string;
        reminderDate: Date;
        isDone: boolean;
    })[]>;
    findByPet(petId: number, userId: number): Promise<{
        id: number;
        petId: number;
        type: string;
        title: string;
        reminderDate: Date;
        isDone: boolean;
    }[]>;
    update(id: number, userId: number, dto: UpdateReminderDto): Promise<{
        id: number;
        petId: number;
        type: string;
        title: string;
        reminderDate: Date;
        isDone: boolean;
    }>;
    markDone(id: number, userId: number): Promise<{
        id: number;
        petId: number;
        type: string;
        title: string;
        reminderDate: Date;
        isDone: boolean;
    }>;
    remove(id: number, userId: number): Promise<{
        id: number;
        petId: number;
        type: string;
        title: string;
        reminderDate: Date;
        isDone: boolean;
    }>;
}

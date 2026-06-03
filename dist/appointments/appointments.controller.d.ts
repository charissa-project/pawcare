import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Role } from '@prisma/client';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(userId: number, dto: CreateAppointmentDto): any;
    findAll(): any;
    findMine(userId: number): any;
    findByDoctor(userId: number): any;
    findOne(id: number, userId: number, role: Role): any;
    updateStatus(id: number, userId: number, role: Role, dto: UpdateAppointmentDto): any;
    cancel(id: number, userId: number): any;
    update(id: number, userId: number, role: Role, dto: UpdateAppointmentDto): any;
}

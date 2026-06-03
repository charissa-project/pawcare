"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appointmentSelect = {
    id: true,
    petId: true,
    doctorId: true,
    appointmentDate: true,
    type: true,
    notes: true,
    status: true,
    pet: {
        select: {
            id: true,
            name: true,
            species: true,
            breed: true,
            age: true,
            gender: true,
            weight: true,
            healthStatus: true,
            photoUrl: true,
            owner: {
                select: { id: true, fullname: true, email: true, role: true },
            },
        },
    },
    doctor: {
        select: {
            id: true,
            specialization: true,
            experience: true,
            schedule: true,
            isAvailable: true,
            user: {
                select: { id: true, fullname: true, email: true },
            },
        },
    },
};
//# sourceMappingURL=appointments.service.js.map
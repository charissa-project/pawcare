"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const fs = __importStar(require("fs"));
const adapter = new adapter_pg_1.PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    const data = JSON.parse(fs.readFileSync('data-backup.json', 'utf-8'));
    for (const user of data.users ?? []) {
        await prisma.user.upsert({ where: { id: user.id }, update: {}, create: user });
    }
    console.log('✅ Users imported');
    for (const doctor of data.doctors ?? []) {
        await prisma.doctor.upsert({ where: { id: doctor.id }, update: {}, create: doctor });
    }
    console.log('✅ Doctors imported');
    for (const pet of data.pets ?? []) {
        await prisma.pet.upsert({ where: { id: pet.id }, update: {}, create: {
                ...pet,
                lastVaccine: pet.lastVaccine ? new Date(pet.lastVaccine) : null,
                nextVaccine: pet.nextVaccine ? new Date(pet.nextVaccine) : null,
            } });
    }
    console.log('✅ Pets imported');
    for (const product of data.products ?? []) {
        await prisma.product.upsert({ where: { id: product.id }, update: {}, create: product });
    }
    console.log('✅ Products imported');
    for (const appointment of data.appointments ?? []) {
        await prisma.appointment.upsert({ where: { id: appointment.id }, update: {}, create: {
                ...appointment,
                appointmentDate: new Date(appointment.appointmentDate),
            } });
    }
    console.log('✅ Appointments imported');
    for (const record of data.medicalRecords ?? []) {
        await prisma.medicalRecord.upsert({ where: { id: record.id }, update: {}, create: record });
    }
    console.log('✅ Medical Records imported');
    for (const reminder of data.reminders ?? []) {
        await prisma.reminder.upsert({ where: { id: reminder.id }, update: {}, create: {
                ...reminder,
                reminderDate: new Date(reminder.reminderDate),
            } });
    }
    console.log('✅ Reminders imported');
    for (const order of data.orders ?? []) {
        await prisma.order.upsert({ where: { id: order.id }, update: {}, create: order });
    }
    console.log('✅ Orders imported');
    for (const item of data.orderItems ?? []) {
        await prisma.orderItem.upsert({ where: { id: item.id }, update: {}, create: item });
    }
    console.log('✅ Order Items imported');
    for (const post of data.posts ?? []) {
        await prisma.post.upsert({ where: { id: post.id }, update: {}, create: post });
    }
    console.log('✅ Posts imported');
    for (const comment of data.comments ?? []) {
        await prisma.comment.upsert({ where: { id: comment.id }, update: {}, create: comment });
    }
    console.log('✅ Comments imported');
    console.log('\n🎉 Semua data berhasil diimport!');
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=import-data.js.map
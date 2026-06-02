"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const doctors_module_1 = require("./doctors/doctors.module");
const pets_module_1 = require("./pets/pets.module");
const appointments_module_1 = require("./appointments/appointments.module");
const medical_records_module_1 = require("./medical-records/medical-records.module");
const products_module_1 = require("./products/products.module");
const orders_module_1 = require("./orders/orders.module");
const posts_module_1 = require("./posts/posts.module");
const comments_module_1 = require("./comments/comments.module");
const cart_module_1 = require("./cart/cart.module");
require("dotenv/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            doctors_module_1.DoctorsModule,
            pets_module_1.PetsModule,
            appointments_module_1.AppointmentsModule,
            medical_records_module_1.MedicalRecordsModule,
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
            posts_module_1.PostsModule,
            comments_module_1.CommentsModule,
            cart_module_1.CartModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
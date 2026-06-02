"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecordsController = void 0;
const common_1 = require("@nestjs/common");
const medical_records_service_1 = require("./medical-records.service");
const create_medical_record_dto_1 = require("./dto/create-medical-record.dto");
const update_medical_record_dto_1 = require("./dto/update-medical-record.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const get_user_decorator_1 = require("../auth/decorators/get-user.decorator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
let MedicalRecordsController = class MedicalRecordsController {
    medicalRecordsService;
    constructor(medicalRecordsService) {
        this.medicalRecordsService = medicalRecordsService;
    }
    create(userId, dto) {
        return this.medicalRecordsService.create(userId, dto);
    }
    findAllAdmin() {
        return this.medicalRecordsService.findAll();
    }
    findAll(userId) {
        return this.medicalRecordsService.findAllByUser(userId);
    }
    findByPet(petId, userId, role) {
        return this.medicalRecordsService.findByPet(petId, userId, role);
    }
    findOne(id, userId, role) {
        return this.medicalRecordsService.findOne(id, userId, role);
    }
    update(id, userId, role, dto) {
        return this.medicalRecordsService.update(id, userId, role, dto);
    }
    remove(id, userId, role) {
        return this.medicalRecordsService.remove(id, userId, role);
    }
};
exports.MedicalRecordsController = MedicalRecordsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.DOCTOR),
    __param(0, (0, get_user_decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_medical_record_dto_1.CreateMedicalRecordDto]),
    __metadata("design:returntype", void 0)
], MedicalRecordsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'DOCTOR'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MedicalRecordsController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, get_user_decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MedicalRecordsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pet/:petId'),
    __param(0, (0, common_1.Param)('petId', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)('id')),
    __param(2, (0, get_user_decorator_1.GetUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], MedicalRecordsController.prototype, "findByPet", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)('id')),
    __param(2, (0, get_user_decorator_1.GetUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], MedicalRecordsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.DOCTOR, client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)('id')),
    __param(2, (0, get_user_decorator_1.GetUser)('role')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, update_medical_record_dto_1.UpdateMedicalRecordDto]),
    __metadata("design:returntype", void 0)
], MedicalRecordsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.DOCTOR),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)('id')),
    __param(2, (0, get_user_decorator_1.GetUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], MedicalRecordsController.prototype, "remove", null);
exports.MedicalRecordsController = MedicalRecordsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('medical-records'),
    __metadata("design:paramtypes", [medical_records_service_1.MedicalRecordsService])
], MedicalRecordsController);
//# sourceMappingURL=medical-records.controller.js.map
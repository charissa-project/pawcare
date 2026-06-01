import { CloudinaryStorage } from 'multer-storage-cloudinary';
export declare const multerConfig: {
    storage: CloudinaryStorage;
    limits: {
        fileSize: number;
    };
};

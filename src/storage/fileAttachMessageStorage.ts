import multer from "multer";
import { v4 as uuid } from "uuid";

const fileAttachMessageStorage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        const nameFix = `${uuid()}-${file.originalname}`;
        cb(null, nameFix);
    }
});

export default fileAttachMessageStorage;
const multer = require("multer");

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        // const ext = file.mimetype.split("/")[1];
        const ext = "xlsx";
        cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});


const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        cb(null, true);
    } else {
        cb("Not a Excel File", false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
}).single("file");


module.exports = upload;

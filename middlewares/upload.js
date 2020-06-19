const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
// const { bucket, accessKeyId, secretAccessKey } = require("../config");
const accessKeyId = "AKIAI3CDN23SSWDKQPMQ";
const secretAccessKey = "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";
const bucket = "portfolio-dn";
const s3 = new aws.S3({
    accessKeyId,
    secretAccessKey,
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket,
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: `${file.originalname}` });
        },
        key: function (req, file, cb) {
            cb(null, `${Date.now().toString()}${file.originalname}`);
        },
    }),
    limits: {
        fileSize: 3 * Math.pow(1024, 2),
    },
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
            return callback(new Error("Only images are allowed"));
        }
        return callback(null, true);
    },
});

const uploadSingle = (type, req, res) => {
    return upload.single(type)(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            ["name", "storageErrors"].forEach((e) => delete err[e]);
            return res.status(400).json({ error: err });
        } else if (err) {
            return res.status(400).json({ error: err });
        } else {
            return res.status(200).json({ linkUrl: req.file.location });
        }
    });
};

const uploadQuestionImage = (req, res) => {
    uploadSingle("questionImage", req, res);
};

module.exports = {
    uploadQuestionImage,
};

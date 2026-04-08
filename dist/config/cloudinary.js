"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: "dsoldgnoi",
    api_key: "527126317566525",
    api_secret: "DE-Zvpc4CpMOPGsOZ-92Hd00W58"
});
exports.default = cloudinary_1.v2;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorController = require("./controller");
const router = express_1.default.Router();
router.get("/authors", authorController.getAuthors);
router.post("/authors", authorController.setNewAuthor);
router.get("/authors/:id", authorController.getAuthorsById);
router.patch("/author/:id", authorController.updateAuthorBooks);
module.exports = router;
//# sourceMappingURL=routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
var express_1 = require("express");
var UserRoutes_1 = require("./UserRoutes");
var mainRouter = (0, express_1.Router)();
exports.mainRouter = mainRouter;
mainRouter.get('/', function (req, res) {
    res.send("Hello World!");
});
mainRouter.use("/users", UserRoutes_1.userRouter);
//# sourceMappingURL=router.js.map
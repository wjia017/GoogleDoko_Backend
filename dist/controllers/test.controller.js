"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const test_service_1 = require("../services/test.service");
const response_helper_1 = require("../helpers/response.helper");
class TestController {
    static async test(_req, res) {
        const message = await test_service_1.TestService.test();
        (0, response_helper_1.sendSuccess)(res, 200, message);
    }
}
exports.TestController = TestController;
exports.default = new class {
    test = TestController.test;
}();

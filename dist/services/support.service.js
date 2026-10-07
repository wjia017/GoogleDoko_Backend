"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportService = void 0;
const repository_1 = require("../repository");
class SupportService {
    async submitInquiry(data) {
        const message = repository_1.supportMessageRepository.create({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone || "",
            address: data.address || "",
            subject: data.subject || "Customer Inquiry",
            inquiry: data.inquiry,
            status: "Open",
        });
        return await repository_1.supportMessageRepository.save(message);
    }
    async getAllInquiries() {
        return await repository_1.supportMessageRepository.find({
            order: { createdAt: "DESC" },
        });
    }
    async updateInquiryStatus(id, status) {
        const message = await repository_1.supportMessageRepository.findOne({
            where: { id },
        });
        if (!message) {
            throw new Error("RESOURCE_NOT_FOUND");
        }
        message.status = status;
        return await repository_1.supportMessageRepository.save(message);
    }
    async subscribe(emailInput) {
        const email = emailInput.trim().toLowerCase();
        const existing = await repository_1.subscriberRepository.findOne({
            where: { email },
        });
        if (existing) {
            return existing;
        }
        const subscriber = repository_1.subscriberRepository.create({ email });
        return await repository_1.subscriberRepository.save(subscriber);
    }
    async getAllSubscribers() {
        return await repository_1.subscriberRepository.find({
            order: { createdAt: "DESC" },
        });
    }
}
exports.SupportService = SupportService;
exports.default = new SupportService();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const repository_1 = require("../repository");
class AddressService {
    async createAddress(userId, data) {
        const existingAddresses = await repository_1.addressRepository.find({
            where: { userId },
        });
        const shouldBeDefault = existingAddresses.length === 0 || data.isDefault === true;
        if (shouldBeDefault && existingAddresses.length > 0) {
            await repository_1.addressRepository.update({ userId }, { isDefault: false });
        }
        const address = repository_1.addressRepository.create({
            userId,
            fullName: data.fullName,
            phone: data.phone,
            addressLine: data.addressLine || data.street || "",
            city: data.city,
            district: data.district || data.area || "",
            province: data.province || "",
            postalCode: data.postalCode || "",
            label: data.label || "Home",
            isDefault: shouldBeDefault,
        });
        return await repository_1.addressRepository.save(address);
    }
    async getUserAddresses(userId) {
        return await repository_1.addressRepository.find({
            where: { userId },
            order: {
                isDefault: "DESC",
                createdAt: "DESC",
            },
        });
    }
    async getAddressById(userId, addressId) {
        return await repository_1.addressRepository.findOne({
            where: {
                id: addressId,
                userId,
            },
        });
    }
    async updateAddress(userId, addressId, data) {
        const address = await repository_1.addressRepository.findOne({
            where: {
                id: addressId,
                userId,
            },
        });
        if (!address) {
            throw new Error("ADDRESS_NOT_FOUND");
        }
        if (data.fullName !== undefined)
            address.fullName = data.fullName;
        if (data.phone !== undefined)
            address.phone = data.phone;
        if (data.addressLine !== undefined || data.street !== undefined) {
            address.addressLine = data.addressLine || data.street || address.addressLine;
        }
        if (data.city !== undefined)
            address.city = data.city;
        if (data.district !== undefined || data.area !== undefined) {
            address.district = data.district || data.area || address.district;
        }
        if (data.province !== undefined)
            address.province = data.province;
        if (data.postalCode !== undefined)
            address.postalCode = data.postalCode;
        if (data.label !== undefined)
            address.label = data.label;
        if (data.isDefault === true) {
            await repository_1.addressRepository.update({ userId }, { isDefault: false });
            address.isDefault = true;
        }
        return await repository_1.addressRepository.save(address);
    }
    async setDefaultAddress(userId, addressId) {
        const address = await repository_1.addressRepository.findOne({
            where: {
                id: addressId,
                userId,
            },
        });
        if (!address) {
            throw new Error("ADDRESS_NOT_FOUND");
        }
        await repository_1.addressRepository.update({ userId }, { isDefault: false });
        address.isDefault = true;
        return await repository_1.addressRepository.save(address);
    }
    async deleteAddress(userId, addressId) {
        const address = await repository_1.addressRepository.findOne({
            where: {
                id: addressId,
                userId,
            },
        });
        if (!address) {
            throw new Error("ADDRESS_NOT_FOUND");
        }
        await repository_1.addressRepository.remove(address);
        if (address.isDefault) {
            const remainingAddress = await repository_1.addressRepository.findOne({
                where: { userId },
                order: {
                    createdAt: "DESC",
                },
            });
            if (remainingAddress) {
                remainingAddress.isDefault = true;
                await repository_1.addressRepository.save(remainingAddress);
            }
        }
    }
}
exports.AddressService = AddressService;
exports.default = new AddressService();

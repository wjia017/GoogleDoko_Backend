import { addressRepository } from "../repository";
import { Address } from "../entities/address.entity";

export interface CreateAddressData {
  fullName: string;
  phone: string;
  addressLine?: string;
  street?: string;
  city: string;
  district?: string;
  area?: string;
  province?: string;
  postalCode?: string;
  label?: string;
  isDefault?: boolean;
}

export class AddressService {
  async createAddress(
    userId: number,
    data: CreateAddressData
  ): Promise<Address> {
    const existingAddresses = await addressRepository.find({
      where: { userId },
    });

    const shouldBeDefault =
      existingAddresses.length === 0 || data.isDefault === true;

    if (shouldBeDefault && existingAddresses.length > 0) {
      await addressRepository.update(
        { userId },
        { isDefault: false }
      );
    }

    const address = addressRepository.create({
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

    return await addressRepository.save(address);
  }

  async getUserAddresses(userId: number): Promise<Address[]> {
    return await addressRepository.find({
      where: { userId },
      order: {
        isDefault: "DESC",
        createdAt: "DESC",
      },
    });
  }

  async getAddressById(
    userId: number,
    addressId: number
  ): Promise<Address | null> {
    return await addressRepository.findOne({
      where: {
        id: addressId,
        userId,
      },
    });
  }

  async updateAddress(
    userId: number,
    addressId: number,
    data: Partial<CreateAddressData>
  ): Promise<Address> {
    const address = await addressRepository.findOne({
      where: {
        id: addressId,
        userId,
      },
    });

    if (!address) {
      throw new Error("ADDRESS_NOT_FOUND");
    }

    if (data.fullName !== undefined) address.fullName = data.fullName;
    if (data.phone !== undefined) address.phone = data.phone;
    if (data.addressLine !== undefined || data.street !== undefined) {
      address.addressLine = data.addressLine || data.street || address.addressLine;
    }
    if (data.city !== undefined) address.city = data.city;
    if (data.district !== undefined || data.area !== undefined) {
      address.district = data.district || data.area || address.district;
    }
    if (data.province !== undefined) address.province = data.province;
    if (data.postalCode !== undefined) address.postalCode = data.postalCode;
    if (data.label !== undefined) address.label = data.label;

    if (data.isDefault === true) {
      await addressRepository.update({ userId }, { isDefault: false });
      address.isDefault = true;
    }

    return await addressRepository.save(address);
  }

  async setDefaultAddress(
    userId: number,
    addressId: number
  ): Promise<Address> {
    const address = await addressRepository.findOne({
      where: {
        id: addressId,
        userId,
      },
    });

    if (!address) {
      throw new Error("ADDRESS_NOT_FOUND");
    }

    await addressRepository.update(
      { userId },
      { isDefault: false }
    );

    address.isDefault = true;

    return await addressRepository.save(address);
  }

  async deleteAddress(
    userId: number,
    addressId: number
  ): Promise<void> {
    const address = await addressRepository.findOne({
      where: {
        id: addressId,
        userId,
      },
    });

    if (!address) {
      throw new Error("ADDRESS_NOT_FOUND");
    }

    await addressRepository.remove(address);

    if (address.isDefault) {
      const remainingAddress = await addressRepository.findOne({
        where: { userId },
        order: {
          createdAt: "DESC",
        },
      });

      if (remainingAddress) {
        remainingAddress.isDefault = true;
        await addressRepository.save(remainingAddress);
      }
    }
  }
}

export default new AddressService();

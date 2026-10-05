import { addressRepository } from "../repository";
import { Address } from "../entities/address.entity";

export interface CreateAddressData {
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  district?: string;
  province?: string;
  postalCode?: string;
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

    // First address should automatically become default
    const shouldBeDefault =
      existingAddresses.length === 0 || data.isDefault === true;

    // If this address is default, remove default status
    // from the user's previous addresses.
    if (shouldBeDefault && existingAddresses.length > 0) {
      await addressRepository.update(
        { userId },
        { isDefault: false }
      );
    }

    const address = addressRepository.create({
      ...data,
      userId,
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

    // If deleted address was default, make another address default
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
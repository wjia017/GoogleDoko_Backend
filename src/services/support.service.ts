import {
  supportMessageRepository,
  subscriberRepository,
} from "../repository";

import {
  SupportMessage,
  Subscriber,
} from "../entities/support.entity";

export interface SubmitInquiryInput {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  subject?: string;
  inquiry: string;
}

export class SupportService {
  async submitInquiry(data: SubmitInquiryInput): Promise<SupportMessage> {
    const extraInfo = [
      data.phone ? `Phone: ${data.phone}` : null,
      data.address ? `Address: ${data.address}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    const inquiryText = extraInfo
      ? `${data.inquiry}\n\n[Contact info: ${extraInfo}]`
      : data.inquiry;

    const message = supportMessageRepository.create({
      fullName: data.fullName,
      email: data.email,
      subject: data.subject || "Customer Inquiry",
      inquiry: inquiryText,
      status: "Open",
    });

    return await supportMessageRepository.save(message);
  }

  async getAllInquiries(): Promise<SupportMessage[]> {
    return await supportMessageRepository.find({
      order: { createdAt: "DESC" },
    });
  }

  async updateInquiryStatus(id: number, status: string): Promise<SupportMessage> {
    const message = await supportMessageRepository.findOne({
      where: { id },
    });

    if (!message) {
      throw new Error("RESOURCE_NOT_FOUND");
    }

    message.status = status;
    return await supportMessageRepository.save(message);
  }

  async subscribe(emailInput: string): Promise<Subscriber> {
    const email = emailInput.trim().toLowerCase();

    const existing = await subscriberRepository.findOne({
      where: { email },
    });

    if (existing) {
      return existing;
    }

    const subscriber = subscriberRepository.create({ email });
    return await subscriberRepository.save(subscriber);
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    return await subscriberRepository.find({
      order: { createdAt: "DESC" },
    });
  }
}

export default new SupportService();

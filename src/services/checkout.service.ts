import {
  settingRepository,
  couponRepository,
  productRepository,
} from "../repository";

export interface CheckoutSettings {
  deliveryFee: number;
  freeDeliveryThreshold: number;
  supportPhone: string;
  supportEmail: string;
  announcement: string;
  marketplaceStatus: string;
}

export class CheckoutService {
  async getSettings(): Promise<CheckoutSettings> {
    const settingsList = await settingRepository.find();
    const settingsMap: Record<string, string> = {};

    for (const item of settingsList) {
      settingsMap[item.key] = item.value;
    }

    return {
      deliveryFee: Number(settingsMap["delivery_fee"] || 50),
      freeDeliveryThreshold: Number(settingsMap["free_delivery_threshold"] || 1500),
      supportPhone: settingsMap["support_phone"] || "+977 980-123-4567",
      supportEmail: settingsMap["support_email"] || "support@googledoko.com",
      announcement: settingsMap["announcement"] || "",
      marketplaceStatus: settingsMap["marketplace_status"] || "active",
    };
  }

  async validateCoupon(code: string, subtotal: number = 0) {
    if (!code) {
      return { valid: false, error: "Please enter a promo code." };
    }

    const cleanCode = code.trim().toUpperCase();
    const coupon = await couponRepository.findOne({
      where: { code: cleanCode, active: 1 },
    });

    if (!coupon) {
      return { valid: false, error: `Invalid coupon code "${cleanCode}".` };
    }

    if (coupon.expiryDate && new Date(coupon.expiryDate).getTime() < Date.now()) {
      return { valid: false, error: `Coupon "${cleanCode}" has expired.` };
    }

    if (coupon.timesUsed >= coupon.maxUses) {
      return { valid: false, error: `Coupon "${cleanCode}" usage limit reached.` };
    }

    const sub = Number(subtotal) || 0;
    if (sub < coupon.minOrder) {
      return {
        valid: false,
        error: `Coupon "${cleanCode}" requires a minimum order of Rs. ${coupon.minOrder}.`,
      };
    }

    const discountAmount =
      coupon.discountType === "percentage"
        ? Math.round((sub * coupon.discountValue) / 100)
        : Math.min(sub, coupon.discountValue);

    return {
      valid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount,
      minOrder: coupon.minOrder,
      message: `Promo code "${coupon.code}" applied! ${
        coupon.discountType === "percentage"
          ? `${coupon.discountValue}% off`
          : `Rs. ${coupon.discountValue} off`
      }`,
    };
  }

  async calculateCheckout(items: any[] = [], couponCode?: string) {
    if (!Array.isArray(items) || items.length === 0) {
      return {
        valid: false,
        items: [],
        subtotal: 0,
        deliveryFee: 0,
        discount: 0,
        total: 0,
        coupon: null,
        message: "No items in checkout",
      };
    }

    const validatedItems: any[] = [];
    let subtotal = 0;
    let hasStockError = false;

    for (const item of items) {
      const pid = String(item.productId || item.id || "");
      const qty = Math.max(1, Number(item.quantity) || 1);
      const product = await productRepository.findOne({
        where: { id: pid },
      });

      if (!product || product.active !== 1) {
        hasStockError = true;
        validatedItems.push({
          productId: pid,
          name: product?.name || "Unavailable Product",
          price: product?.price || 0,
          quantity: qty,
          weight: product?.weight || "",
          image: product?.image || "",
          available: false,
          stock: 0,
          error: "Product is no longer available",
        });
        continue;
      }

      const availableStock = product.stock;
      const actualQty = Math.min(qty, availableStock);
      if (qty > availableStock) {
        hasStockError = true;
      }

      const lineTotal = product.price * actualQty;
      subtotal += lineTotal;

      validatedItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: actualQty,
        requestedQuantity: qty,
        weight: product.weight,
        image: product.image,
        seller: product.seller,
        stock: availableStock,
        available: availableStock > 0,
        lineTotal,
        error:
          qty > availableStock
            ? `Only ${availableStock} units available in stock`
            : undefined,
      });
    }

    const settings = await this.getSettings();
    const deliveryFee =
      subtotal >= settings.freeDeliveryThreshold || subtotal === 0
        ? 0
        : settings.deliveryFee;

    let discount = 0;
    let couponResult: any = null;

    if (couponCode) {
      couponResult = await this.validateCoupon(couponCode, subtotal);
      if (couponResult.valid) {
        discount = couponResult.discountAmount;
      }
    }

    const total = Math.max(0, subtotal + deliveryFee - discount);

    return {
      valid: !hasStockError && subtotal > 0,
      items: validatedItems,
      subtotal,
      deliveryFee,
      discount,
      total,
      coupon: couponResult?.valid ? couponResult : null,
      freeDeliveryThreshold: settings.freeDeliveryThreshold,
      awayFromFreeDelivery: Math.max(0, settings.freeDeliveryThreshold - subtotal),
    };
  }
}

export default new CheckoutService();

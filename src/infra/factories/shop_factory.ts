import { Shop } from "../db/mysql/entities/shop/shop_entity";

export class ShopFactory {
  static build(data: Partial<Shop>) {
    const shop = new Shop();
    return Object.assign(shop, data);
  }
}

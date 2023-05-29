export const products = [
  { sku: 'ipd', name: 'Super iPad', price: 549.99 },
  { sku: 'mbp', name: 'MacBook Pro', price: 1399.99 },
  { sku: 'atv', name: 'Apple TV', price: 109.50 },
  { sku: 'vga', name: 'VGA adapter', price: 30.00 },
];

export const pricingRules = {
  atv: { quantity: 3, discountPrice: 109.5 * 2 }, // 3-for-2 deal on Apple TVs
  ipd: { quantity: 4, bulkDiscountPrice: 499.99 }, // Bulk discount for Super iPad
  mbp: { bundleSku: 'vga', bundleQuantity: 1 }, // Bundle free VGA adapter with MacBook Pro
};
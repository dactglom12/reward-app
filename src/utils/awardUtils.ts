export const canPurchase = (userBalance: number, price: number) =>
  userBalance >= price;

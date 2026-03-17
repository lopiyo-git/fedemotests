const currentYear = new Date().getFullYear();

const visaData = {
  nameOnCard: "John Doe",
  cardNumber: "4242424242424242",
  cvc: "311",
  expiryMonth: "12",
  expiryYear: (currentYear + 5).toString(),
};

export const paymentInfo = {
  visaData: visaData,
  // You can add more here later, e.g., mastercardData: mastercardData
};

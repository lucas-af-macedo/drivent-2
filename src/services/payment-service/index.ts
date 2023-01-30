import { PaymentBody } from "@/protocols";
import { paymentRepository } from "@/repositories/payment-repository";

async function getPayment(ticketId: number) {
  return await paymentRepository.find(ticketId);
}

async function postPayment(body: PaymentBody) {
  const cardLastDigits = String(body.cardData.number % 10000);
  const ticketId: number = body.ticketId;
  const cardIssuer: string = body.cardData.issuer;

  const value: number = await paymentRepository.findValue(ticketId);
  await paymentRepository.updateTicket(ticketId);
  return await paymentRepository.post(cardLastDigits, ticketId, cardIssuer, value);
}

export const paymentService = {
  getPayment,
  postPayment,
};

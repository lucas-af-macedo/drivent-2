import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import { paymentService } from "@/services/payment-service";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = Number(req.query.ticketId) as number;

  const payment = await paymentService.getPayment(ticketId);
  return res.status(200).send(payment);
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const body = req.body;

  const payment = await paymentService.postPayment(body);
  return res.status(200).send(payment);
}

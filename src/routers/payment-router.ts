import { getPayment, postPayment } from "@/controllers/payment-controller";
import { authenticateToken } from "@/middlewares";
import { paymentValidation, ticketExists, ticketIdExistis, userOwnerOfTicket } from "@/middlewares/payment-middleware";
import { Router } from "express";

const paymentRouter = Router();

paymentRouter
  .use("/*", authenticateToken)
  .get("/payments:ticketId?", ticketIdExistis, ticketExists, userOwnerOfTicket, getPayment)
  .post("/payments/process", paymentValidation, ticketExists, userOwnerOfTicket, postPayment);

export default paymentRouter;

import { getTickets, getTypes, postTickets } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { ticketValidation, userHasEnrollment } from "@/middlewares/ticket-middleware";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .use("/*", authenticateToken)
  .get("/types", getTypes)
  .get("/", getTickets)
  .post("/", userHasEnrollment, ticketValidation, postTickets);

export default ticketsRouter;

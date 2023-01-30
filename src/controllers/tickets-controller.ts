import ticketsService from "@/services/tickets-service";
import { Response, Request } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import { EnrollmentRequest } from "@/middlewares/ticket-middleware";

export async function getTypes(req: Request, res: Response) {
  const types = await ticketsService.getTicketsType();
  return res.status(httpStatus.OK).send(types);
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  try {
    const ticket = await ticketsService.getTicket(userId);
    return res.status(200).send(ticket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function postTickets(req: EnrollmentRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const enrollmentId = req.enrollmentId;
  try {
    const ticket = await ticketsService.postTicket(enrollmentId, ticketTypeId);
    return res.status(201).send(ticket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NOT_FOUND);
    }
  }
}

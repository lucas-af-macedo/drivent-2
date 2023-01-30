import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authentication-middleware";
import { prisma } from "@/config";
import paymentSchema from "@/schemas/payment-schema";
import { PaymentBody } from "@/protocols";

export function ticketIdExistis(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (req.query?.ticketId === undefined) {
    return res.sendStatus(400);
  }
  next();
}

export async function ticketExists(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  let ticketId;
  if (req.query?.ticketId) {
    ticketId = Number(req.query.ticketId) as number;
  } else {
    ticketId = Number(req.body.ticketId) as number;
  }

  const ticket = await prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
  });
  if (!ticket) {
    return res.sendStatus(404);
  }
  next();
}

export async function userOwnerOfTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId as number;
  let ticketId;
  if (req.query?.ticketId) {
    ticketId = Number(req.query.ticketId) as number;
  } else {
    ticketId = Number(req.body.ticketId) as number;
  }

  const ticket = await prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    select: {
      Enrollment: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (Number(ticket.Enrollment.userId) !== userId) {
    return res.sendStatus(401);
  }
  next();
}

export async function paymentValidation(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const payment = req.body as PaymentBody;

  const validation = paymentSchema.validate(payment, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    res.status(400).send(errors);
    return;
  }
  next();
}

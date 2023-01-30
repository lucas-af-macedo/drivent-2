import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authentication-middleware";
import httpStatus from "http-status";
import ticketSchema from "@/schemas/ticket-schema";
import { prisma } from "@/config";

export async function userHasEnrollment(req: EnrollmentRequest, res: Response, next: NextFunction) {
  const { userId } = req.body;

  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId: userId,
    },
  });
  if (!enrollment) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
  req.enrollmentId = enrollment.id;
  next();
}

export async function ticketValidation(req: EnrollmentRequest, res: Response, next: NextFunction) {
  const ticket = req.body;

  const validation = ticketSchema.validate(ticket, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    res.status(400).send(errors);
    return;
  }
  next();
}

export type EnrollmentRequest = AuthenticatedRequest & EnrollmentId;

type EnrollmentId = {
  enrollmentId: number;
};

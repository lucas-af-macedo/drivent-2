import { prisma } from "@/config";

async function findTicketType() {
  return await prisma.ticketType.findMany();
}

async function findFirst(userId: number) {
  return await prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: userId
      } 
    },
    include: {
      TicketType: true
    }
  });
}

async function postTicket(enrollmentId: number, ticketTypeId: number) {
  return await prisma.ticket.create({
    data: {
      status: "RESERVED",
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId
    },
    include: {
      TicketType: true
    }
  });
}

async function getEnrollmentId(userId: number) {
  return await prisma.enrollment.findFirst({
    where: {
      userId: userId
    }
  });
}

const ticketsRepository = {
  findTicketType,
  findFirst,
  postTicket,
  getEnrollmentId,
};

export default ticketsRepository;

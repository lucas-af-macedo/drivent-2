import { prisma } from "@/config";

async function find(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId: ticketId
    }
  });
}

async function updateTicket(ticketId: number) {
  return await prisma.ticket.update({
    where: {
      id: ticketId
    },
    data: {
      status: "PAID"
    }
  });
}

async function findValue(ticketId: number) {
  return (await prisma.ticket.findFirst({
    where: {
      id: ticketId
    },
    include: {
      TicketType: true
    }
  })).TicketType.price;
}

async function post(cardLastDigits: string, ticketId: number, cardIssuer: string, value: number) {
  return await prisma.payment.create({
    data: {
      cardLastDigits: cardLastDigits,
      ticketId: ticketId,
      cardIssuer: cardIssuer,
      value: value
    }
  });
}

export const paymentRepository = {
  find,
  findValue,
  post,
  updateTicket,
};

import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";

async function getTicketsType() {
  return await ticketsRepository.findTicketType();
}

async function getTicket(userId: number) {
  const ticket = await ticketsRepository.findFirst(userId);
  if(!ticket) {
    throw notFoundError();
  }
  return ticket;
}

async function postTicket(enrollmentId: number, ticketTypeId: number) {
  const ticket = await ticketsRepository.postTicket(enrollmentId, ticketTypeId);
  return ticket;
}

const ticketsService = {
  getTicketsType,
  getTicket,
  postTicket,
};

export default ticketsService;

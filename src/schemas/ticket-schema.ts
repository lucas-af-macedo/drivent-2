import Joi from "joi";

const ticketSchema = Joi.object({
  ticketTypeId: Joi.number().min(1).required()
});

export default ticketSchema;

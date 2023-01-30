import Joi from "joi";

const paymentSchema = Joi.object({
  ticketId: Joi.number().min(1).required(),
  cardData: Joi.object().required()
});

export default paymentSchema;

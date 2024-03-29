import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@ticket-template/common";
import { Ticket } from "../models/Ticket";
import {TicketUpdatedPunlisher } from '../events/publishers/ticket-updated-publisher'
import { natsWrapper } from './../nats-wrapper';

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();

    new TicketUpdatedPunlisher(natsWrapper.client).publish({
      id : ticket.id,
      price : ticket.price, 
      title : ticket.title,
      userId : ticket.userId
    })

    res.send(ticket);
  }
);

export { router as updateTicketRouter };

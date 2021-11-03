import mongoose from 'mongoose';


interface TicketAttr {
  title: string,
  price: number, 
  userId: string,
}

interface TicketDocs extends mongoose.Document {
  title: string,
  price: number, 
  userId: string,
}

interface TicketModel extends mongoose.Model<TicketDocs> {
  build(attrs: TicketAttr): TicketDocs;
}


const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  }
}, {
  versionKey: false,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});


ticketSchema.statics.build = (attrs: TicketAttr) => {
  return new Ticket(attrs);
}

const Ticket = mongoose.model<TicketDocs, TicketModel>('Ticket', ticketSchema);
export {Ticket}
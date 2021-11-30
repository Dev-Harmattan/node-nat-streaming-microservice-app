import { Stan } from "node-nats-streaming";
import { Subjects } from "./SubjectsEnum";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  private client: Stan;
  abstract subject: T['subject'];
  
  constructor(stan: Stan){
    this.client = stan;
  }

  publish(data: T['data']):Promise<void>{

    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if(err){
          return reject(err);
        }
        console.log('Publish Event to ', this.subject);
        resolve()
      })
    })
    
  }
  
}
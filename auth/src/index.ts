import express from 'express';

const app = express();
app.use(express.json());


const PORT = 3000;
app.listen(3000, () => {
  console.log(`Auth running on port: ${PORT}`);
})
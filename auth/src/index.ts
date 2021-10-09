import express from 'express';

const app = express();
app.use(express.json());


app.get('/api/user/currentUser', (req, res) => {
  res.send('Current User');
})

const PORT = 3000;
app.listen(3000, () => {
  console.log(`Auth running on port: ${PORT}`);
})
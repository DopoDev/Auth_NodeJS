import express from 'express';
import { UserRepository } from './user-repository.js';
import cors from 'cors';

const server = express();
server.use(express.json());
server.set('view engine', 'ejs');
const PORT = process.env.PORT ?? 3000;

server.get('/', (req, res) => {
    res.render('example', {username: 'DopoDev3'});
})

server.use(cors())

server.post('/login' , async (req, res) => {
  const {username, password} = req.body;
  try{
    const user = await UserRepository.login({username, password});
    res.status(200).json({user});
  }catch(error){
    console.error(error);
    res.status(401).json({error: error.message});
  }
})

server.post('/register', async (req, res) => {
    const {username, password} = req.body;
    console.log(req.body);

    try{
        const user = await UserRepository.create({username, password});
        res.status(201).json({user});
    }catch(error){
        console.error(error);
        res.status(401).json({error: error.message});
    }
})

server.post('/logout', (req, res) => {})

server.post('/protected', (req, res) => {})


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Press Ctrl+C to stop the server`);
})
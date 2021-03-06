import { Router } from 'express';
import { getGames, insertGame } from '../controllers/gameController.js'; 

const gameRouter = Router();

gameRouter.get('/games', getGames);
gameRouter.post('/games', insertGame);

export default gameRouter;
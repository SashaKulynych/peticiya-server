import { cachedData } from '../../utils';
import data from './data'

const express = require('express');
const router = express.Router();

data(router)

router.get('/', (req: any, res: any) => {
    res.end({ info: 'server is up and running', cachedData });
});

export default router;
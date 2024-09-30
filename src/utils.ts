
import { IData } from './router/data';

const fs = require('fs');

export const host = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/' : 'https://intense-sands-29465.herokuapp.com/'

export let cachedData: IData = []

export const getData = async () => {
    try {
        const file = JSON.parse(fs.readFileSync('./src/sources/data.json', 'utf8'));
        cachedData = file
        return file
    } catch (e) {
        console.log({ e })
    }
}

export const setData = (data: IData) => {
    try {
        cachedData = data
        fs.writeFile('myjsonfile.json', JSON.stringify(data), 'utf8');
    } catch (e) {
        console.log({ e })
    }
}
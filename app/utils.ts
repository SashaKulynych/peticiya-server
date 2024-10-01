import { IData } from "./api/data/data";
import { cachedDataMain } from "./sources/CachedData";


const fs = require('fs');

export let cachedData: IData = [...cachedDataMain]

export const getData = () => {
    try {
        // const file = JSON.parse(fs.readFileSync('./app/sources/data.json', 'utf8'));
        // cachedData = file
        return cachedData
    } catch (e) {
        console.log({ e })
        return 'Error'
    }
}

export const setData = (data: IData) => {
    try {
        cachedData = data
        // fs.writeFile('myjsonfile.json', JSON.stringify(data), 'utf8');
    } catch (e) {
        console.log({ e })
    }
}
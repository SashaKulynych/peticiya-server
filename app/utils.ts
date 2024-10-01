import { IData } from "./api/data/data";


const fs = require('fs');

export let cachedData: IData = []

export const getData = () => {
    try {
        const file = JSON.parse(fs.readFileSync('./app/sources/data.json', 'utf8'));
        cachedData = file
        return file
    } catch (e) {
        console.log({ e })
        return 'Error'
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
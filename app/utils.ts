import { IData } from "./api/data/data";
import { cachedDataMain } from "./sources/CachedData";


// const fs = require('fs');

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

export const months = {
    "січня": "january",
    "лютого": "february",
    "березня": "march",
    "квітня": "april",
    "травня": "may",
    "червня": "june",
    "липня": "july",
    "серпня": "august",
    "вересня": "september",
    "жовтня": 'october',
    "листопада": "november",
    "грудня": "december"
} as const

// export const FormatData = () => {
//     try {
//         const newData: IData = []
//         const file: IData = JSON.parse(fs.readFileSync('./app/sources/data.json', 'utf8'));
//         file.forEach((value) => {
//             const month = Object.keys(months).find((v) => value.date.includes(v))
//             if (month) {
//                 // @ts-ignore
//                 const date = value.date.replace(month, months[month])
//                 newData.push({
//                     ...value,
//                     dateTimestamp: new Date(date).getTime()
//                 })
//             }

//         })
//         console.log({ newData })
//         return cachedData
//     } catch (e) {
//         console.log({ e })
//         return 'Error'
//     }
// }

export const setData = (data: IData) => {
    try {
        cachedData = data
        // fs.writeFile('./app/sources/data.json', JSON.stringify(data), 'utf8');
    } catch (e) {
        console.log({ e })
    }
}
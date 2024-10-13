import { cachedData, months, setData } from "../../utils";

import axios from 'axios'

import jsdom from 'jsdom'

const link = '/api/getData'

export interface IDataResponse {
    pag_html: string
    table_html: string
}

export type IData = {
    isFinished?: boolean
    total?: number
    dateTimestamp: number
    date: string;
    data: {
        number: string;
        name: string;
        date: string;
    }[];
}[];

export const getData = async (data: {
    petitionId: number
    pageNumber: number
}): Promise<IDataResponse | undefined> => {
    const { petitionId, pageNumber } = data
    try {
        const response = await axios.get(`https://petition.president.gov.ua/petition/${petitionId}/votes/${pageNumber}/json`)
        if (response) {
            return response.data
        }
        return
    } catch (e) {
        console.log({ e })
        return
    }
}

export default (router: any) => {
    router.get(link, (req: any, res: any) => {
        try {
            const arr: IData = [...cachedData];
            let pageNumber = 1;
            const onFinish = () => {
                console.log(JSON.parse(JSON.stringify(arr)))
                const newArr = [...arr].sort((a, b) => a.dateTimestamp - b.dateTimestamp).reverse()
                for (let i = 0; i < newArr.length; i++) {
                    newArr[i].isFinished = ![0, 1, 2].includes(i)
                    newArr[i].total = newArr[i].data.length
                }
                setData(arr)
                res.send({
                    success: true, data: newArr.map((v) => ({
                        ...v,
                        data: [],
                    }))
                });
            };
            const init = async () => {
                const response = await getData({
                    petitionId: 234334,
                    pageNumber
                });
                if (response) {
                    const dom = (new jsdom.JSDOM(response.table_html)).window.document;
                    let finish = false;
                    const tableExist = dom.querySelector('.table_row');
                    if (tableExist) {
                        const elements = dom.querySelectorAll('.table_row');
                        for (let index = elements.length - 1; index >= 0; index--) {
                            const element = elements[index];
                            if (element) {
                                const number = element.querySelector('.number')?.innerHTML || '';
                                const name = element.querySelector('.name')?.innerHTML || '';
                                const date = element.querySelector('.date')?.innerHTML || '';
                                const newItem = {
                                    number,
                                    name,
                                    date
                                };
                                const i = arr.findIndex((v) => v.date === date);
                                if (i !== -1) {
                                    const alreadyExist = arr[i].data.find(
                                        (v) => v.name === newItem.name
                                    );
                                    if (alreadyExist) {
                                        finish = true;
                                    } else {
                                        arr[i].data.push(newItem);
                                    }
                                } else {
                                    const value = {
                                        date,
                                        data: [newItem]
                                    }
                                    const month = Object.keys(months).find((v) => value.date.includes(v))
                                    if (month) {
                                        // @ts-ignore
                                        const date = value.date.replace(month, months[month])
                                        arr.unshift({
                                            ...value,
                                            dateTimestamp: new Date(date).getTime()
                                        });
                                    }

                                }
                            }
                        }
                        if (finish) {
                            onFinish();
                        } else {
                            pageNumber++;
                            init();
                        }
                    } else {
                        onFinish();
                    }
                }
            };
            init();
        } catch (e) {
            res.send({ success: false, data: e });
        }
    });
} 
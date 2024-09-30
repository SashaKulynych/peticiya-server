import { cachedData, setData } from "../utils";

import axios from 'axios'

import jsdom from 'jsdom'

const link = '/getData'

export interface IDataResponse {
    pag_html: string
    table_html: string
}

export type IData = {
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
            res.send({ success: true, data: [] });
            return 
            const arr: IData = [...cachedData];
            let pageNumber = 1;
            const onFinish = () => {
                setData(arr)
                console.log({ arr })
                res.send({ success: true, data: arr });
            };
            const init = async () => {
                const response = await getData({
                    petitionId: 234334,
                    pageNumber
                });
                console.log({ pageNumber, response })
                if (response) {
                    const dom = (new jsdom.JSDOM(response.table_html)).window.document;
                    let finish = false;
                    const tableExist = dom.querySelector('.table_row');
                    if (tableExist) {
                        const elements = dom.querySelectorAll('.table_row');
                        for (let index = 0; index <= elements.length; index++) {
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
                                    arr.unshift({
                                        date,
                                        data: [newItem]
                                    });
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
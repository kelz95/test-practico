import { Request, Response } from 'express';
import {findItems, findById } from '../services/items.service';
import { handleHttp } from '../utils/error.handle';

const getItems = async (req: Request, res: Response) => {
    try{
        const query = req.query.q;
        const response = await findItems(query);
        res.send(response);
    } catch(error) {
        console.log(error);

        handleHttp(res, 'ERROR_GET_ITEMS', error);
    }
}

const getItem = async ({ params }: Request, res: Response) => {
    try{
        const { id } = params;
        const response = await findById(id);
        res.send(response);
    } catch(error) {
        handleHttp(res, 'ERROR_GET_ITEM', error);
    }
}

export { getItems, getItem }
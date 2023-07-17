import { Response } from "express";

const handleHttp = (res: Response, code: string, error: any) => {
    res.status(500);
    res.send({ success: false, code: code, message: error});
};

export { handleHttp }
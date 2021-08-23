import { NextApiRequest, NextApiResponse } from 'next';
import { putPaper } from 'components/PaperService';

type Response = {
    ok: boolean;
};

export default async function PaperAPIHandler(req: NextApiRequest, res: NextApiResponse<Response>) {
    let { title } = req.body;
    await putPaper(title);
    res.status(200).json({ ok: true });
}
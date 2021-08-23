import { getMongoDB } from "./Database";

export const putPaper = async (title: string): Promise<boolean> => {
    let db = await getMongoDB();
    let res = await db.collection('paper').insertOne({ name: title });
    return res.acknowledged;
}
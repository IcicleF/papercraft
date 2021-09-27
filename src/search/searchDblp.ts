import axios from 'axios';
import { SearchEngineResult, SearchRecord } from 'src/types/common';
import { DblpAuthor, DblpQuery } from 'src/types/dblp';
import { ENTRIES_PER_QUERY_PAGE } from './common';

export async function searchDblp(
    title: string | undefined,
    author: string | undefined,
    page?: number
): Promise<SearchEngineResult> {
    const apiRes = await axios.get(`https://dblp.org/search/publ/api`, {
        params: {
            q: [title || '', author || ''].filter(item => Boolean(item)).join(' '),
            format: 'json',
            h: ENTRIES_PER_QUERY_PAGE,
        },
    });
    const res = (apiRes.data as DblpQuery).result;

    const entries = res.hits.hit?.map(({ info }) => ({
        type: info.type,
        title: info.title,
        authors:
            info.authors.author instanceof Array
                ? (info.authors.author as DblpAuthor[]).map(({ text }) => text)
                : [(info.authors.author as DblpAuthor).text],
        year: Number(info.year),
        venue: info.venue,
        url: info.ee || info.url,
    })).filter(entry => Boolean(entry.authors.find(paperAuthor => !author || paperAuthor.indexOf(author) !== -1)));

    return { page: page || 0, total: entries?.length || 0, res: entries || [] };
}

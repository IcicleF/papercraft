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
            q: title,
            format: 'json',
            h: ENTRIES_PER_QUERY_PAGE,
        },
    });
    const res = (apiRes.data as DblpQuery).result;
    const total = Number(res.hits['@total']);

    const entries = res.hits.hit.map(({ info }) => {
        return {
            type: info.type,
            title: info.title,
            authors:
                info.authors.author instanceof Array
                    ? (info.authors.author as DblpAuthor[]).map(({ text }) => text)
                    : [(info.authors.author as DblpAuthor).text],
            year: Number(info.year),
            url: info.url,
        };
    });
    return { page: page || 0, total, res: entries };
}

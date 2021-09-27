export interface SearchRecord {
    type: string;
    title: string;
    authors: string[];
    year: number;
    venue: string;
    url: string;
}

export type SearchEngineResult = {
    page?: number;
    total: number;
    res: SearchRecord[];
};

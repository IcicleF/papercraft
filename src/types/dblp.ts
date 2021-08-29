// Metadata
export type DblpStatus = { '@code': string; text: string };
export type DblpTime = { '@time': string; text: string };
export type DblpCompletions = {
    '@total': string;
    '@computed': string;
    '@sent': string;
    c: {
        '@sc': string;
        '@dc': string;
        '@oc': string;
        '@id': string;
        text: string;
    };
};

// Query hit information
export type DblpAuthor = { '@pid': string; text: string };
export type DblpAuthors = { author: DblpAuthor | DblpAuthor[] };

export type DblpHitInfo = {
    type: 'Conference and Workshop Papers' | 'Journal Articles' | 'Informal Publications';
    authors: DblpAuthors;
    title: string;
    venue: string;
    volume?: string;
    number?: string;
    pages?: string;
    year: string;
    key: string;
    doi?: string;
    ee: string;
    url: string;
};

export type DblpHit = {
    '@score': string;
    '@id': string;
    info: DblpHitInfo;
    url: string;
};
export type DblpHits = {
    '@total': string;
    '@computed': string;
    '@sent': string;
    '@first': string;
    hit: DblpHit[];
};

// Whole
export type DblpQueryResult = {
    query: string;
    status: DblpStatus;
    time: DblpTime;
    completions: DblpCompletions;
    hits: DblpHits;
};
export type DblpQuery = { result: DblpQueryResult };

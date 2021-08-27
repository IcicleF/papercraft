import axios from 'axios';

// Metadata
type DblpStatus = { '@code': string; text: string };
type DblpTime = { '@time': string; text: string };
type DblpCompletions = {
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
type DblpAuthor = { '@pid': string; text: string };
type DblpAuthors = { author: [DblpAuthor] };

type DblpHitInfo = {
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

type DblpHit = {
    '@score': string;
    '@id': string;
    info: DblpHitInfo;
    url: string;
};
type DblpHits = {
    '@total': string;
    '@computed': string;
    '@sent': string;
    '@first': string;
    hit: [DblpHit];
};

// Whole
type DblpQueryResult = {
    query: string;
    status: DblpStatus;
    time: DblpTime;
    completions: DblpCompletions;
    hits: DblpHits;
};
type DblpQuery = { result: DblpQueryResult };

function searchDblp(q: string, author: string, range?: number, comp?: number) {
    
}
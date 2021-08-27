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

type DblpGeneralHitInfo = {
    type: string;
    authors: DblpAuthors;
    title: string;
    venue: string;
    volume?: string;
    pages?: string;
    year: string;
    key: string;
    doi?: string;
    ee: string;
    url: string;
};

type DblpConferenceHitInfo = {
    type: 'Conference and Workshop Papers';
} & DblpGeneralHitInfo;

type DblpJournalHitInfo = {
    type: 'Journal Articles';
    number: string;
} & DblpGeneralHitInfo;

type DblpInformalHitInfo = {
    type: 'Informal Publications';
} & DblpGeneralHitInfo;

type DblpHitInfo = DblpConferenceHitInfo | DblpJournalHitInfo | DblpInformalHitInfo;

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
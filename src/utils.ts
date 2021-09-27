import { Profile } from 'next-auth';

type TsinghuaIdentity = {
    provider: string;
    extern_uid: string;
};

// Check user profile
export function checkProfile(profile: Profile): boolean {
    let identities = profile.identities as TsinghuaIdentity[];
    let accepted = process.env.ACCEPTED_UIDS;
    if (!identities || identities.length === 0 || !accepted) return false;

    for (let i = 0; i < identities.length; i++) {
        let identity = identities[i];
        if (!identity || identity.provider !== 'thuid') continue;
        if (accepted.indexOf(identity.extern_uid) > -1) return true;
    }
    return false;
}

// Query string build & parse
export function buildQueryString(
    title: string | undefined,
    author: string | undefined,
    engine: { dblp: boolean; google: boolean; arxiv: boolean }
): string | null {
    let engines: string[] = [];
    if (engine.dblp) engines.push('dblp');
    if (engine.google) engines.push('google');
    if (engine.arxiv) engines.push('arxiv');
    if (engines === []) return null;
    let engineStr = 'engine=' + engines.join(',');

    let authorStr: string | undefined = undefined;
    if (author) {
        authorStr = 'author="' + author + '"';
    }

    let titleStr = title;
    if (!authorStr && !titleStr) return null;

    let collection = [engineStr, authorStr, titleStr];
    let searchStr = collection.filter((value) => Boolean(value)).join(' ');
    return searchStr;
}

export function parseQueryStringToUri(query: string): string {
    let title: string | undefined = undefined;
    let author: string | undefined = undefined;
    let engine: Record<string, boolean> = {};

    query = query.replace(/\s+/g, ' ').trim();

    const L = query.length;
    let inScope = false;
    for (let i = 0; i < L; i++) {
        let j = i;
        while ((j < L && query[j] !== ' ') || inScope) j++;
        // TODO: parse
    }

    // If a scope didn't close, the query is invalid
    if (inScope) {
        return '/';
    }

    return '/';
}

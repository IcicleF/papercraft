import { Profile } from 'next-auth';

type TsinghuaIdentity = {
    provider: string;
    extern_uid: string;
};

// Check user profile
export function checkProfile(profile: Profile): boolean {
    let identities = profile.identities as TsinghuaIdentity[];
    let accepted = process.env.ACCEPTED_UIDS;
    if (!identities || identities.length == 0 || !accepted) return false;

    for (let i = 0; i < identities.length; i++) {
        let identity = identities[i];
        if (!identity || identity.provider !== 'thuid') continue;
        if (accepted.indexOf(identity.extern_uid) > -1) return true;
    }
    return false;
}

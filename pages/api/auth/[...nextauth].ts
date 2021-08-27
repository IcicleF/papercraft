import NextAuth, { Profile, User } from 'next-auth';
import { checkProfile } from 'src/Utils';

export default NextAuth({
    providers: [
        {
            id: 'tsinghua-git',
            name: 'Tsinghua Git',
            type: 'oauth',
            version: '2.0',
            scope: 'read_user',
            params: { grant_type: 'authorization_code' },
            accessTokenUrl: 'https://git.tsinghua.edu.cn/oauth/token',
            authorizationUrl: 'https://git.tsinghua.edu.cn/oauth/authorize?response_type=code',
            profileUrl: 'https://git.tsinghua.edu.cn/api/v4/user',
            async profile(profile: Profile, tokens): Promise<User & { id: string }> {
                return {
                    id: profile.id as string,
                    name: profile.name,
                    email: profile.email,
                    image: profile.image,
                };
            },
            clientId: process.env.OAUTH_ID as string,
            clientSecret: process.env.OAUTH_SECRET as string,
        },
    ],
    callbacks: {
        async signIn(user, account, profile): Promise<boolean> {
            return checkProfile(profile);
        },
    },
    pages: {
        error: '/auth/error',
    },
});

import { ApolloError } from '@apollo/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { client } from '../../graphql';
import { QUERY_PROFILE } from '../../graphql/profile';
import { User } from '../../models/user';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    const { authorization } = req.headers

    try {
        const response = await client.query<{
            profile: User
        }>({
            query: QUERY_PROFILE,
            context: {
                headers: {    
                    authorization
                }
            }
            
        })

        
        return res.status(200).json(response.data.profile)
    } catch (error: any) {
        
        return res.status(401).end()
    }
}
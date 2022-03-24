import { NextApiRequest, NextApiResponse } from "next";

import { client } from "../../graphql";
import { MUTATION_AUTHENTICATE } from "../../graphql/auth";
import { User } from './../../models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { code } = req.body;

  try {    
    const response = await client.mutate<{
      authenticate: {
        token: string;
        user: User;
      };
    }>({
      mutation: MUTATION_AUTHENTICATE,
      variables: {
        code
      }
    });

    return res.status(200).json(response.data?.authenticate)
  } catch (error: any) {
    return res.status(401).end()
  }

}

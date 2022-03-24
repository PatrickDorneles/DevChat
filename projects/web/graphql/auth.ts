import { gql } from "@apollo/client";

export const MUTATION_AUTHENTICATE = gql`
    mutation AuthenticateMutation($text: String!) {
        authenticate(code: $code) {
            token
            user {
                id,
                username,
                name,
                github_id,
                avatar_url
            }
        }
    }
`;

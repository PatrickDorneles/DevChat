import { gql } from "@apollo/client";

export const QUERY_PROFILE = gql`
    query {
        profile {
            id,
            username,
            name,
            github_id,
            avatar_url
        }
    }
`
import {  gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
    query {
        queryProduct {
        id
        title
        price
        description
        }
    }
`;
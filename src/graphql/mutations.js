import { gql } from '@apollo/client';

export const DELETE_PRODUCT = gql`
mutation deleteProduct($id: ID!) {
    deleteProduct(filter:  { id: [$id] }) {
      msg
      product {
        id
        title
        price
        description
      }
    }
  }
`;


export const ADD_PRODUCT = gql`
mutation addProduct($title: String!, $price: Float!, $description: String){
    addProduct(
      input: {
        title: $title,
        price: $price,
        description: $description
      }
    )
    {
     product {
        id
        title
        price
        description
      }
    }
  }
`;
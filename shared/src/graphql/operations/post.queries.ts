import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      id
      title
      content
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    getPostById(id: $id) {
      id
      title
      content
    }
  }
`;

export const GET_ALL_USER_POSTS = gql`
  query GetAllUserPosts($userId: ID!) {
    getAllUserPosts(userId: $userId) {
      id
      title
      content
    }
  }
`;

/* any file inside the folder pages/api is mapped to  /api/* and will be treated as an API endpoint instead of page.
*/
import { GraphQLClient, gql } from "graphql-request";


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINTS
const graphcmsToken = process.env.GRAPHCMS_TOKEN
// export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });
// }

export default async function comments(req, res) {
console.log(graphcmsToken);
  const graphQLClient  = new GraphQLClient(graphqlAPI,{
    headers:{
      authorization: `Bearer ${graphcmsToken}`
    }
  })
//mutation means can be mutable
  const query  = gql`
  mutation createComment($name:String!, $email:String!,$comment:String!,$slug:String!){
    createComment(data:{name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}){
      id
    }
  }
  `
  try{
  const result = await graphQLClient.request(query,req.body)
  return res.status(200).send(result);
  }catch(err){
    return res.status(500).send(err);
    console.log(err)
  }
}




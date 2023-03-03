export const userInfoQuery = `
    query MyQuery($identifier: String = "kiriti") {
            User(where: {identifier: {_eq: $identifier}}) {
            index
            identifier
            publicKey
            name
        }
}
`;

export const scoreRequestQuery = `
    query MyQuery($_eq: String = "kiri") {
            Request(where: {responder: {_eq: $_eq}}) {
            index
            fs
            es
            querier
            responder
            response
            us
            User {
                name
                index
                identifier
            }
            userByResponder {
                index
                identifier
                name
            }
        }
    }
  
`;

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

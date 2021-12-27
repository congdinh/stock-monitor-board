import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    """
    Find one by id
    """
    symbol(_id: ID!): SymbolPayload
    """
    Find many by list id or empty for all
    """
    symbolsByIds(ids: [ID!]): ListSymbolPayload
    """
    Filter and paging
    """
    symbols(
      """
      Filter attributes filter
      """
      where: SymbolWhereInput
      """
      Sort Filter data by attributes
      """
      orderBy: SymbolOrderByInput
      """
      Amount of data per Page, default 20 items
      """
      limit: Int
      """
      Current Page, start from 0.
      """
      skip: Int
    ): PagingListSymbolPayload
  }

  extend type Mutation {
    """
    Create a doc
    """
    createSymbol(input: CreateSymbolInput!): SymbolPayload
    """
    Update a doc
    """
    updateSymbol(input: UpdateSymbolInput!): SymbolPayload
    """
    Remove Symbol
    """
    removeSymbol(_id: ID!): SymbolPayload
  }

  input SymbolOrderByInput {
    """
    Order by attributes
    """
    code: SortType
    companyName: SortType
    companyNameEn: SortType
    exchange: SortType
    shortName: SortType
    status: SortType
  }

  input SymbolWhereInput {
    """
    Filter by attributes
    """
    _id: QueryStringInput
    companyName: QueryStringInput
    companyNameEn: QueryStringInput
    exchange: QueryStringInput
    shortName: QueryStringInput
    code: QueryStringInput
    status: QueryStatusInput

    """
    Multiple filter Input
    """
    and: [SymbolWhereInput]
    not: [SymbolWhereInput]
    nor: [SymbolWhereInput]
    or: [SymbolWhereInput]
  }

  type Symbol {
    """
    Id filter
    """
    _id: ID!
    """
    Symbol code
    """
    code: String!
    """
    Name
    """
    companyName: String!
    """
    Name English
    """
    companyNameEn: String
    """
    Exchange
    """
    exchange: String!
    """
    shortName
    """
    shortName: String
    """
    Status
    """
    status: SharedStatus
    """
    Create Date
    """
    createdAt: Date
    """
    Update Date
    """
    updatedAt: Date
  }

  type SymbolPayload {
    """
    Status request
    """
    status: Int
    """
    Message log request
    """
    message: String
    """
    Data result
    """
    data: Symbol
  }

  type ListSymbolPayload {
    """
    Status request
    """
    status: Int
    """
    Message log request
    """
    message: String
    """
    List data result
    """
    data: [Symbol]
  }

  type PagingListSymbolPayload {
    """
    Status request
    """
    status: Int
    """
    Message log request
    """
    message: String
    """
    List data result
    """
    data: [Symbol]
    """
    Page Information
    """
    pageInfo: PageInfo
  }

  input CreateSymbolInput {
    """
    Symbol code
    """
    code: String!
    """
    Name
    """
    companyName: String!
    """
    Name English
    """
    companyNameEn: String
    """
    Exchange
    """
    exchange: String!
    """
    shortName
    """
    shortName: String
    """
    Status
    """
    status: SharedStatus
  }

  input UpdateSymbolInput {
    """
    Id
    """
    _id: ID!
    """
    Symbol code
    """
    code: String
    """
    Name
    """
    companyName: String
    """
    Name English
    """
    companyNameEn: String
    """
    Exchange
    """
    exchange: String
    """
    shortName
    """
    shortName: String
    """
    Status
    """
    status: SharedStatus
  }
`;

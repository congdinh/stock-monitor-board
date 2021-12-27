import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    """
    Find one by id
    """
    premiumListing(_id: ID!): PremiumListingPayload
    """
    Find many by list id or empty for all
    """
    premiumListingsByIds(ids: [ID!]): ListPremiumListingPayload
    """
    Filter and paging
    """
    premiumListings(
      """
      Filter attributes filter
      """
      where: PremiumListingWhereInput
      """
      Sort Filter data by attributes
      """
      orderBy: PremiumListingOrderByInput
      """
      Amount of data per Page, default 20 items
      """
      limit: Int
      """
      Current Page, start from 0.
      """
      skip: Int
    ): PagingListPremiumListingPayload
  }

  extend type Mutation {
    """
    Create a doc
    """
    createPremiumListing(input: CreatePremiumListingInput!): PremiumListingPayload
    """
    Update a doc
    """
    updatePremiumListing(input: UpdatePremiumListingInput!): PremiumListingPayload
    """
    Remove PremiumListing
    """
    removePremiumListing(_id: ID!): PremiumListingPayload
  }

  input PremiumListingOrderByInput {
    """
    Order by attributes
    """
    symbol: SortType
    sequence: SortType
    type: SortType
    status: SortType
  }

  input QueryPremiumTypeInput {
    """
    Equal
    """
    eq: PremiumType
    """
    Regex Match
    """
    regex: PremiumType
    """
    Not Equal
    """
    ne: PremiumType
    """
    In
    """
    in: [PremiumType]
    """
    Not In
    """
    nin: [PremiumType]
  }

  input PremiumListingWhereInput {
    """
    Filter by attributes
    """
    _id: QueryStringInput
    code: QueryStringInput
    symbol: QueryStringInput
    type: QueryPremiumTypeInput
    sequence: QueryIntInput
    status: QueryStatusInput

    """
    Multiple filter Input
    """
    and: [PremiumListingWhereInput]
    not: [PremiumListingWhereInput]
    nor: [PremiumListingWhereInput]
    or: [PremiumListingWhereInput]
  }

  type PremiumListing {
    """
    Id filter
    """
    _id: ID!
    """
    Symbol
    """
    symbol: String!
    """
    Code ID
    """
    code: String!
    """
    Premium Type
    """
    type: PremiumType
    """
    Sequence
    """
    sequence: Int
    """
    Content
    """
    content: String
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

  type PremiumListingPayload {
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
    data: PremiumListing
  }

  type ListPremiumListingPayload {
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
    data: [PremiumListing]
  }

  type PagingListPremiumListingPayload {
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
    data: [PremiumListing]
    """
    Page Information
    """
    pageInfo: PageInfo
  }

  input CreatePremiumListingInput {
    """
    Symbol
    """
    symbol: String!
    """
    Code ID
    """
    code: String!
    """
    Premium Type
    """
    type: PremiumType!
    """
    Sequence
    """
    sequence: Int
    """
    Content
    """
    content: String
    """
    Status
    """
    status: SharedStatus
  }

  input UpdatePremiumListingInput {
    """
    Id
    """
    _id: ID!
    """
    Symbol
    """
    symbol: String
    """
    Code ID
    """
    code: String
    """
    Premium Type
    """
    type: PremiumType
    """
    Sequence
    """
    sequence: Int
    """
    Content
    """
    content: String
    """
    Status
    """
    status: SharedStatus
  }
`;

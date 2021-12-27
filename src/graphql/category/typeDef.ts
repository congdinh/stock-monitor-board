import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    """
    Find one by id
    """
    category(_id: ID!): CategoryPayload
    """
    Find many by list id or empty for all
    """
    categoriesByIds(ids: [ID!]): ListCategoryPayload
    """
    Filter and paging
    """
    categories(
      """
      Filter attributes filter
      """
      where: CategoryWhereInput
      """
      Sort Filter data by attributes
      """
      orderBy: CategoryOrderByInput
      """
      Amount of data per Page, default 20 items
      """
      limit: Int
      """
      Current Page, start from 0.
      """
      skip: Int
    ): PagingListCategoryPayload
    """
    Find Random Category
    """
    randomCategory: CategoryPayload
    """
    Find Optional Category
    """
    optionalCategory: ListCategoryPayload
  }

  extend type Mutation {
    """
    Create a doc
    """
    createCategory(input: CreateCategoryInput!): CategoryPayload
    """
    Update a doc
    """
    updateCategory(input: UpdateCategoryInput!): CategoryPayload
    """
    Remove Category
    """
    removeCategory(_id: ID!): CategoryPayload
  }

  input CategoryOrderByInput {
    """
    Order by attributes
    """
    name: SortType
    nameEn: SortType
    sequence: SortType
    status: SortType
  }

  input CategoryWhereInput {
    """
    Filter by attributes
    """
    _id: QueryStringInput
    name: QueryStringInput
    nameEn: QueryStringInput
    code: QueryStringInput
    sequence: QueryIntInput
    symbols: QueryStringInput
    status: QueryStatusInput

    """
    Multiple filter Input
    """
    and: [CategoryWhereInput]
    not: [CategoryWhereInput]
    nor: [CategoryWhereInput]
    or: [CategoryWhereInput]
  }

  type Category {
    """
    Id filter
    """
    _id: ID!
    """
    Name
    """
    name: String!
    """
    Name English
    """
    nameEn: String
    """
    Code ID
    """
    code: String
    """
    Title
    """
    title: String
    """
    Description
    """
    description: String
    """
    Category Type
    """
    type: CategoryType
    """
    Symbols
    """
    symbols: String
    """
    Sequence
    """
    sequence: Int
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

  type CategoryPayload {
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
    data: Category
  }

  type ListCategoryPayload {
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
    data: [Category]
  }

  type PagingListCategoryPayload {
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
    data: [Category]
    """
    Page Information
    """
    pageInfo: PageInfo
  }

  input CreateCategoryInput {
    """
    Name
    """
    name: String!
    """
    Name English
    """
    nameEn: String
    """
    Code ID
    """
    code: String
    """
    Symbols
    """
    symbols: String
    """
    Sequence
    """
    sequence: Int
    """
    Title
    """
    title: String
    """
    Description
    """
    description: String
    """
    Category Type
    """
    type: CategoryType
    """
    Status
    """
    status: SharedStatus
  }

  input UpdateCategoryInput {
    """
    Id
    """
    _id: ID!
    """
    Name
    """
    name: String
    """
    Name English
    """
    nameEn: String
    """
    Code ID
    """
    code: String
    """
    Symbols
    """
    symbols: String
    """
    Sequence
    """
    sequence: Int
    """
    Title
    """
    title: String
    """
    Description
    """
    description: String
    """
    Category Type
    """
    type: CategoryType
    """
    Status
    """
    status: SharedStatus
  }
`;

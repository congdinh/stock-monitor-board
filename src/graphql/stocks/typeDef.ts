import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    """
    List data stocks
    """
    stocks(symbols: [String!]!): ResultStocksPayload
    """
    List data stocks in exchange
    """
    stockByExchange(exchange: ExchangeType!): ResultStocksPayload
    """
    List symbols in exchange
    """
    exchanges(exchange: ExchangeType!): ResultExchangesPayload
    """
    Top Stock by exchange
    """
    topStockByExchange(input: TopStockInput!): ResultStocksPayload
  }

  extend type Subscription {
    """
    Notify data stock by list stock symbols
    """
    stockChanged(symbols: [String!]!): Stock
    """
    List symbols in exchange
    """
    exchangeChanged(exchange: ExchangeType!): [String]
    """
    Notify data stock by exchange
    """
    stockChangedByExchange(exchange: ExchangeType!): Stock
  }

  type ResultStocksPayload {
    """
    Status request
    """
    status: Int
    """
    Message log request
    """
    message: String
    """
    List Stocks result
    """
    data: [Stock]
  }

  type ResultExchangesPayload {
    """
    Status request
    """
    status: Int
    """
    Message log request
    """
    message: String
    """
    List stock name
    """
    data: [String]
  }

  type Stock {
    """
    ID CK
    """
    id: String
    """
    Mã CK
    """
    symbol: String
    """
    Giá tham chiếu
    """
    refPrice: Float
    """
    Giá trần
    """
    ceiling: Float
    """
    Giá sàn
    """
    floor: Float
    """
    Tổng khối lượng
    """
    totalVol: Int
    """
    Giá mua 1
    """
    bidP1: Float
    """
    KL mua 1
    """
    bidV1: Int
    """
    Giá mua 2
    """
    bidP2: Float
    """
    KL mua 2
    """
    bidV2: Int
    """
    Giá mua 3
    """
    bidP3: Float
    """
    KL mua 3
    """
    bidV3: Int
    """
    Giá khớp
    """
    matchedPrice: Float
    """
    KL khớp
    """
    matchedVolume: Int
    """
    Mức tăng giá
    """
    priceChange: Float
    """
    % Mức tăng giá
    """
    priceChangePercent: Float
    """
    Giá bán 1
    """
    offerP1: Float
    """
    KL bán 1
    """
    offerV1: Int
    """
    Giá bán 2
    """
    offerP2: Float
    """
    KL bán 2
    """
    offerV2: Int
    """
    Giá bán 3
    """
    offerP3: Float
    """
    KL bán 3
    """
    offerV3: Int
    """
    Giá cao nhất
    """
    highest: Float
    """
    Giá khớp lệnh trung bình
    """
    avgPrice: Float
    """
    Giá thấp nhất
    """
    lowest: Float
    """
    Nước ngoài mua
    """
    foreignB: Int
    """
    Nước ngoài bán
    """
    foreignS: Int
  }

  input TopStockInput {
    """
    Exchange: hose | hnx | upcom
    """
    exchange: ExchangeType!
    """
    Sort Type default desc
    """
    sortType: SortType
    """
    Sort Field default priceChangePercent
    """
    sortField: TopStockSort
    """
    Top size
    """
    size: String
  }
`;

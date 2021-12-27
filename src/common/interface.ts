export interface IResult {
  status: number;
  message: string;
  data?: IStock;
}

export interface IResults {
  status: number;
  message: string;
  data?: IStock[];
}

export interface IFilterQuery {
  orderBy?: object;
  where?: any;
  limit: number;
  skip: number;
  select?: string[];
}

export interface IExchangeResults {
  status: number;
  message: string;
  data?: string[];
}
export interface IStock {
  id?: string;
  symbol?: string;
  refPrice?: number;
  ceiling?: number;
  floor?: number;
  totalVol?: number;
  bidP1?: number;
  bidV1?: number;
  bidP2?: number;
  bidV2?: number;
  bidP3?: number;
  bidV3?: number;
  matchedPrice?: number;
  matchedVolume?: number;
  priceChange?: number;
  priceChangePercent?: number;
  offerP1?: number;
  offerV1?: number;
  offerP2?: number;
  offerV2?: number;
  offerP3?: number;
  offerV3?: number;
  highest?: number;
  avgPrice?: number;
  lowest?: number;
  foreignB?: number;
  foreignS?: number;
}

export interface ICategory {
  name?: string;
  symbol?: string[];
  status?: string;
}

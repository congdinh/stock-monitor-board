import puppeteer from 'puppeteer';
import { msleep } from 'sleep';
import { isSaturday, isSunday, lightFormat, isWithinInterval } from 'date-fns';

import pubsub from '../external-libs/pubsub';
import Redis from '../external-libs/redis';
import Logger from '../external-libs/winston';
import { cacheStockSymbol, EXCHANGES } from '../configs/constant';

const {
  STOCK_ENDPOINT: stockEndpoint,
  STOCK_PATH_HOSE: hose,
  STOCK_PATH_HNX: hnx,
  STOCK_PATH_UPCOM: upcom,
  STOCK_PATH_DERIVATIVES: derivatives
} = process.env;

const logger = new Logger({ route_name: 'crawl-stock' });

function formatPrice(value: string) {
  if (isNaN(value)) return 0;
  return Math.floor(Number(value) * 1000);
}
function formatVolumn(value: string) {
  const regex = /,/gi;
  const newValue: string = value.replace(regex, '');
  if (isNaN(newValue)) return 0;
  return Number(newValue) * 10;
}

function isTradingTime() {
  const current = new Date();
  const isBetweenTime = isWithinInterval(current, {
    start: new Date(lightFormat(current, 'yyyy-MM-dd 08:45:00')),
    end: new Date(lightFormat(current, 'yyyy-MM-dd 15:15:00'))
  });
  const check = !isSunday(current) && !isSaturday(current) && isBetweenTime;
  return check;
}

function processAndStoreData(data: any[], exchange: string) {
  logger.info('ProcessAndStoreData', { exchange });
  data.forEach(async (dataRow) => {
    let stock: any = {};
    const convertSymbol: string = dataRow[0]?.replace('*', '');

    // Check Page DERIVATIVES
    if (exchange === EXCHANGES.DERIVATIVES) {
      stock = {
        symbol: convertSymbol,
        refPrice: formatPrice(dataRow[2]),
        ceiling: formatPrice(dataRow[3]),
        floor: formatPrice(dataRow[4]),
        totalVol: formatVolumn(dataRow[22]),
        bidP3: formatPrice(dataRow[7]),
        bidV3: formatVolumn(dataRow[8]),
        bidP2: formatPrice(dataRow[9]),
        bidV2: formatVolumn(dataRow[10]),
        bidP1: formatPrice(dataRow[11]),
        bidV1: formatVolumn(dataRow[12]),
        matchedPrice: formatPrice(dataRow[13]),
        matchedVolume: formatVolumn(dataRow[14]),
        priceChange: formatPrice(dataRow[15] || '0'),
        offerP1: formatPrice(dataRow[16]),
        offerV1: formatVolumn(dataRow[17]),
        offerP2: formatPrice(dataRow[18]),
        offerV2: formatVolumn(dataRow[19]),
        offerP3: formatPrice(dataRow[20]),
        offerV3: formatVolumn(dataRow[21]),
        highest: formatPrice(dataRow[24]),
        lowest: formatPrice(dataRow[25])
      };
    } else if (convertSymbol.length === 3) {
      // Only Underlying symbol
      const foreign = dataRow[25].split(' ');
      stock = {
        symbol: convertSymbol,
        refPrice: formatPrice(dataRow[1]),
        ceiling: formatPrice(dataRow[2]),
        floor: formatPrice(dataRow[3]),
        totalVol: formatVolumn(dataRow[4]),
        bidP3: formatPrice(dataRow[5]),
        bidV3: formatVolumn(dataRow[6]),
        bidP2: formatPrice(dataRow[7]),
        bidV2: formatVolumn(dataRow[8]),
        bidP1: formatPrice(dataRow[9]),
        bidV1: formatVolumn(dataRow[10]),
        matchedPrice: formatPrice(dataRow[11]),
        matchedVolume: formatVolumn(dataRow[12]),
        priceChange: formatPrice(dataRow[13] || '0'),
        offerP1: formatPrice(dataRow[14]),
        offerV1: formatVolumn(dataRow[15]),
        offerP2: formatPrice(dataRow[16]),
        offerV2: formatVolumn(dataRow[17]),
        offerP3: formatPrice(dataRow[18]),
        offerV3: formatVolumn(dataRow[19]),
        highest: formatPrice(dataRow[20]),
        avgPrice: formatPrice(dataRow[21]),
        lowest: formatPrice(dataRow[22]),
        foreignB: formatVolumn(foreign[0] || '0'),
        foreignS: formatVolumn(foreign[1] || '0')
      };
    }

    if (stock?.symbol) {
      stock['priceChangePercent'] =
        (stock.priceChange && Number((stock.priceChange / stock.refPrice) * 100).toFixed(1)) || '0';
      const preStock: any[] = (await Redis.hmget(`${cacheStockSymbol}${stock.symbol}`, 'totalVol')) || [];
      const preTotalVol = (preStock?.length && parseInt(preStock[0])) || null;

      // const percent = Math.floor((stock.matchedPrice / stock.refPrice) * 1000) || 0;
      if (preTotalVol && stock.totalVol > preTotalVol) {
        pubsub.publish('STOCK_CHANGED', { data: stock });
        pubsub.publish('STOCK_CHANGED_EXCHANGE', { data: stock, exchange });
      }
      await Redis.hmset(`${cacheStockSymbol}${stock.symbol}`, stock);
      // const pipeline = Redis.pipeline();

      // pipeline.hmset(`${cacheStockSymbol}${stock.symbol}`, stock);
      // pipeline.zadd(`${cacheStockPrefix}top_vol`, stock.totalVol.toString(), `${stock.symbol}:${stock.totalVol}`);
      // pipeline.zadd(`${cacheStockPrefix}top_percent`, percent.toString(), `${stock.symbol}:${percent}`);
      // pipeline.zadd(
      //   `${cacheStockPrefix}top_foreign_buy`,
      //   stock.foreignB.toString(),
      //   `${stock.symbol}:${stock.foreignB}`
      // );
      // pipeline.zadd(
      //   `${cacheStockPrefix}top_foreign_sell`,
      //   stock.foreignS.toString(),
      //   `${stock.symbol}:${stock.foreignS}`
      // );
      // await pipeline.exec();
    }
  });
  return true;
}

async function loadStockTable(page: any, exchange: string) {
  const elementTable: string =
    (exchange === EXCHANGES.DERIVATIVES && '#banggia-phaisinh-body tr') || '#banggia-khop-lenh-body tr';

  const data = await page.$$eval(elementTable, (rows: any[]) => {
    $('#banggia-khop-lenh-body').removeClass();
    $('#banggia-khop-lenh-body > tr').removeClass();
    $('#banggia-khop-lenh-body > tr > td').removeClass();
    $('#banggia-khop-lenh-body > tr > td > a').removeClass();
    $('#banggia-khop-lenh-body > tr > td > span').removeClass();
    $('#banggia-khop-lenh-body > tr > td > span > span').removeClass();
    // window.scrollBy(0, document.body.scrollHeight);
    return Array.from(rows, (row) => {
      const columns = row.querySelectorAll('td');
      return Array.from(columns, (column: any) => column.innerText);
    });
  });
  logger.info(`Total stock table ${exchange}`, data.length);
  return data;
}

async function crawlPageTable(page: any, exchange: string) {
  try {
    await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' });
    let data = await loadStockTable(page, exchange);
    while (data) {
      const checkTime = isTradingTime();
      processAndStoreData(data, exchange);
      await msleep(1000);
      if (checkTime) {
        data = await loadStockTable(page, exchange);
      } else {
        await page.close();
        break;
      }
    }
  } catch (error) {
    logger.error('crawlPageTable', error);
  }
  return true;
}

const run = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    devtools: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '-disk-cache-size=0', '--lang=en-US']
  });
  // Hose
  const pageHose = await browser.newPage();
  await pageHose.goto(`${stockEndpoint}/${hose}`, { waitUntil: 'networkidle2', timeout: 0 });
  crawlPageTable(pageHose, EXCHANGES.HOSE);
  await msleep(1000);

  // Hnx
  const pageHnx = await browser.newPage();
  await pageHnx.goto(`${stockEndpoint}/${hnx}`, { waitUntil: 'networkidle2', timeout: 0 });
  crawlPageTable(pageHnx, EXCHANGES.HNX);
  await msleep(1000);

  // Hnx
  const pageUpcom = await browser.newPage();
  await pageUpcom.goto(`${stockEndpoint}/${upcom}`, { waitUntil: 'networkidle2', timeout: 0 });
  crawlPageTable(pageUpcom, EXCHANGES.UPCOM);
  await msleep(1000);

  // Derivatives
  const pageDerivatives = await browser.newPage();
  await pageDerivatives.goto(`${stockEndpoint}/${derivatives}`, { waitUntil: 'networkidle2', timeout: 0 });
  crawlPageTable(pageDerivatives, EXCHANGES.DERIVATIVES);
  await msleep(1000);

  return true;
};

run();

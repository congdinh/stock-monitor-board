import puppeteer from 'puppeteer';
import { msleep } from 'sleep';

import Redis from '../external-libs/redis';
import pubsub from '../external-libs/pubsub';
import Logger from '../external-libs/winston';
import { difference } from '../utils';
import { cacheStockExchange, EXCHANGES } from '../configs/constant';
import { IStock } from '../common/interface';
const {
  STOCK_ENDPOINT: stockEndpoint,
  STOCK_PATH_HOSE: hose,
  STOCK_PATH_HNX: hnx,
  STOCK_PATH_UPCOM: upcom,
  STOCK_PATH_DERIVATIVES: derivatives,
  STOCK_PATH_VN30: vn30,
  STOCK_PATH_HNX30: hnx30
} = process.env;

const logger = new Logger({ route_name: 'crawl-stock' });

async function processAndStoreData(data: any[], exchange: string) {
  const prevSymbols: string[] = (await Redis.smembers(`${cacheStockExchange}${exchange}`)) || [];
  const lastSymbols: string[] = [];
  await data.forEach(async (dataRow) => {
    const convertSymbol: string = dataRow[0]?.replace('*', '');
    // Check Page DERIVATIVES or only Underlying symbol
    if (exchange === EXCHANGES.DERIVATIVES || convertSymbol.length === 3) {
      let stock: IStock = {
        symbol: convertSymbol
      };

      if (stock.symbol) {
        lastSymbols.push(stock.symbol);
        // await Redis.sadd(`${cacheStockExchange}${exchange}`, stock.symbol);
      } else {
        logger.error('Error processAndStoreData', dataRow);
      }
    }
  });
  if (lastSymbols.length) {
    // replace all symbols in exchange
    await Redis.del(`${cacheStockExchange}${exchange}`);
    await Redis.sadd(`${cacheStockExchange}${exchange}`, lastSymbols);
  }
  // Check stock move to other exchange to publish
  const checkSymbols: string[] = (lastSymbols.length > 0 && difference(lastSymbols, prevSymbols)) || [];
  if (checkSymbols.length) {
    await pubsub.publish('EXCHANGE_CHANGED', { data: lastSymbols, exchange });
  }
  return true;
}

async function loadStockTable(page: any, exchange: string) {
  let data = await page.$$eval('#banggia-khop-lenh-body tr', (rows: any[]) => {
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

  if (!data?.length) {
    data = await page.$$eval('#banggia-phaisinh-body tr', (rows: any[]) => {
      $('#banggia-phaisinh-body').removeClass();
      $('#banggia-phaisinh-body > tr').removeClass();
      $('#banggia-phaisinh-body > tr > td').removeClass();
      $('#banggia-phaisinh-body > tr > td > a').removeClass();
      $('#banggia-phaisinh-body > tr > td > span').removeClass();
      $('#banggia-phaisinh-body > tr > td > span > span').removeClass();
      // window.scrollBy(0, document.body.scrollHeight);
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll('td');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });
  }
  logger.info(`Total stock table ${exchange}`, data.length);
  return data;
}

async function crawlPageTable(page: any, exchange: string) {
  try {
    await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' });
    let data = await loadStockTable(page, exchange);
    await processAndStoreData(data, exchange);
  } catch (error) {
    logger.error('crawlPageTable', error);
  }
  await page.close();
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

  // vn30
  const pageVn30 = await browser.newPage();
  await pageVn30.goto(`${stockEndpoint}/${vn30}`, { waitUntil: 'networkidle2', timeout: 0 });
  crawlPageTable(pageVn30, EXCHANGES.VN30);
  await msleep(1000);

  // hnx30
  const pageHnx30 = await browser.newPage();
  await pageHnx30.goto(`${stockEndpoint}/${hnx30}`, { waitUntil: 'networkidle2', timeout: 0 });
  crawlPageTable(pageHnx30, EXCHANGES.HNX30);
  await msleep(1000);

  return true;
};

run();

const FetchData = require('./services/fetchdata');
const Calculations = require('./services/calculations');
const {
  cashInEndPoint,
  naturalEndPoint,
  legalEndPoint,
} = require('./utilities/endpoints');

// getting file name from node command
const fileName = process.argv[2];

// checking valid file input
if (!fileName) throw 'A json file name must be provided after app.js';

// passing json file for getting data ready
const data = new FetchData(fileName);

// getting all calculations operations
const counter = new Calculations();

// this function's duty is to calculate all the transactions
const countAllFees = async () => {
  // calling cash in api and setting essential data
  const cashInApiData = await data.getDataFromApi(cashInEndPoint);
  const cashInPercent = cashInApiData.percents;
  const maxCashInFee = cashInApiData.max.amount;

  // calling natural api and setting essential data
  const naturalApiData = await data.getDataFromApi(naturalEndPoint);
  const naturalPercent = naturalApiData.percents;
  const freeCashOutLimit = naturalApiData.week_limit.amount;

  // calling legal api and setting essential data
  const legalApiData = await data.getDataFromApi(legalEndPoint);
  const legalPercent = legalApiData.percents;
  const minCashOutFee = legalApiData.min.amount;

  // checking the requirements and start calculating each valid transaction
  data.transActions.map((transAction) => {
    if (
      transAction.type === 'cash_in' &&
      transAction.operation.currency === 'EUR'
    )
      counter.countCashInFee(
        transAction.operation.amount,
        cashInPercent,
        maxCashInFee
      );
    else if (
      transAction.type === 'cash_out' &&
      transAction.operation.currency === 'EUR'
    ) {
      transAction.user_type === 'natural'
        ? counter.countNaturalCashOutFee(
            transAction.operation.amount,
            naturalPercent,
            freeCashOutLimit
          )
        : counter.countLegalCashOutFee(
            transAction.operation.amount,
            legalPercent,
            minCashOutFee
          );
    } else console.log('Invalid Transaction!');
  });
};

// start calculations
countAllFees();

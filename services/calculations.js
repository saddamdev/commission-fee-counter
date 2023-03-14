// a class of some conditional calculation methods
class Calculations {
  constructor() {}

  // this method can round a decimal value to its next upper bound, like - 1.023 to 1.03
  roundTheFee = (fee) => Math.ceil(fee * 100) / 100;

  // this method calculates cash in fee based on amount, percent and maximum fee
  countCashInFee = (amount, percent, maxFee) => {
    const totalFee = (amount / 100) * percent;
    const fee = this.roundTheFee(totalFee);

    fee > maxFee ? console.log(maxFee.toFixed(2)) : console.log(fee.toFixed(2));
  };

  /*
  this method calculates cash out fee for Natural Person
  based on amount, percent and free cash out limit
  default commission fee is 0.3%
  */
  countNaturalCashOutFee = (amount, percent = 0.3, freeLimit) => {
    let fee;

    if (amount > freeLimit) {
      const totalFee = ((amount - freeLimit) / 100) * percent;
      fee = this.roundTheFee(totalFee);
    } else fee = 0.0;

    console.log(fee.toFixed(2));
  };

  /*
  this method calculates cash out fee for Legal Person
  based on amount, percent and minimum fee
  */
  countLegalCashOutFee = (amount, percent, minFee) => {
    const totalFee = (amount / 100) * percent;
    const fee = this.roundTheFee(totalFee);

    fee < minFee ? console.log(minFee.toFixed(2)) : console.log(fee.toFixed(2));
  };
}

module.exports = Calculations;

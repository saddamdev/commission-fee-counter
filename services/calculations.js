let activeUsers = [];
let transActionRecords = [];
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
  this method's duty is to detect a new week for a user
  and return total cash out of current week
  */
  getThisWeekCashOut = (userId, transActionDate, transActionAmount) => {
    let totalWeeklyCashOut;

    const date = new Date(transActionDate);
    const currentDay = date.getDay();
    const currentDate = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    if (activeUsers.includes(userId) === false) {
      activeUsers.push(userId);
      const user = {
        id: userId,
        lastTransAction: transActionDate,
        date: currentDate,
        day: currentDay,
        month: currentMonth,
        year: currentYear,
        cashOut: transActionAmount,
      };
      transActionRecords.push(user);
      totalWeeklyCashOut = transActionAmount;
    } else {
      transActionRecords = transActionRecords.map((user) => {
        if (user.id === userId) {
          const dateGap = currentDate - user.date;
          if (
            transActionDate !== user.lastTransAction &&
            (currentDay <= user.day ||
              dateGap > 7 ||
              dateGap <= 0 ||
              currentMonth !== user.month ||
              currentYear !== user.year) &&
            currentDay > 0
          ) {
            totalWeeklyCashOut = transActionAmount;
            return { ...user, cashOut: transActionAmount };
          } else {
            totalWeeklyCashOut = user.cashOut + transActionAmount;
            return { ...user, cashOut: totalWeeklyCashOut };
          }
        } else return user;
      });
    }

    return totalWeeklyCashOut;
  };

  /*
  this method calculates cash out fee for Natural Person
  based on id, date, amount, percent and free cash out limit
  default commission fee is 0.3%
  */
  countNaturalCashOutFee = (id, date, amount, percent = 0.3, freeLimit) => {
    let fee;

    const weeklyCashOut = this.getThisWeekCashOut(id, date, amount);

    if (weeklyCashOut > freeLimit) {
      const totalFee =
        weeklyCashOut - amount === 0
          ? ((amount - freeLimit) / 100) * percent
          : (amount / 100) * percent;
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

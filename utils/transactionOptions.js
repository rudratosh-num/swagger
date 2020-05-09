const transactionLocal = {
  readPreference: 'primary',
  readConcern: { level: 'local' },
  writeConcern: { w: 'majority' }
};

module.exports = {
  transactionLocal: transactionLocal
}

const Lotto = artifacts.require("Lotto");

contract('Lotto', (accounts) => {

  it('Initial bet should activate and change balance of contract', async () => {
    const lottoInstance = await Lotto.deployed();
    const tx_amount = 100000000000000000;
    await lottoInstance.sendTransaction({from:accounts[1], value:tx_amount});
    const reply = await lottoInstance.check();
    const active = reply[0]
    const received = parseFloat(reply[1]);
    assert.equal(active, true, "Contract should be active after 1 bet is sent");
    assert.equal(tx_amount, received, "Current balance not equal to sent amount");
  });

  it('Initial bet should activate and change balance of contract', async () => {
    const lottoInstance = await Lotto.deployed();
    const tx_amount = 100000000000000000;
    await lottoInstance.sendTransaction({from:accounts[1], value:tx_amount});
    const reply = await lottoInstance.check();
    const active = reply[0]
    const received = parseFloat(reply[1]);
    assert.equal(active, true, "Contract should be active after 1 bet is sent");
    assert.equal(tx_amount, received, "Current balance not equal to sent amount");
  });

  // it('should put 10000 lotto in the first account', async () => {
  //   const lottoInstance = await lotto.deployed();
  //   const balance = await lottoInstance.getBalance.call(accounts[0]);
  //
  //   assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  // });
  // it('should call a function that depends on a linked library', async () => {
  //   const lottoInstance = await lotto.deployed();
  //   const lottoBalance = (await lottoInstance.getBalance.call(accounts[0])).toNumber();
  //   const lottoEthBalance = (await lottoInstance.getBalanceInEth.call(accounts[0])).toNumber();
  //
  //   assert.equal(lottoEthBalance, 2 * lottoBalance, 'Library function returned unexpected function, linkage may be broken');
  // });
  // it('should send coin correctly', async () => {
  //   const lottoInstance = await lotto.deployed();
  //
  //   // Setup 2 accounts.
  //   const accountOne = accounts[0];
  //   const accountTwo = accounts[1];
  //
  //   // Get initial balances of first and second account.
  //   const accountOneStartingBalance = (await lottoInstance.getBalance.call(accountOne)).toNumber();
  //   const accountTwoStartingBalance = (await lottoInstance.getBalance.call(accountTwo)).toNumber();
  //
  //   // Make transaction from first account to second.
  //   const amount = 10;
  //   await lottoInstance.sendCoin(accountTwo, amount, { from: accountOne });
  //
  //   // Get balances of first and second account after the transactions.
  //   const accountOneEndingBalance = (await lottoInstance.getBalance.call(accountOne)).toNumber();
  //   const accountTwoEndingBalance = (await lottoInstance.getBalance.call(accountTwo)).toNumber();
  //
  //
  //   assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
  //   assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  // });
});

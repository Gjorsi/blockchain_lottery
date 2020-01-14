const Lotto = artifacts.require("Lotto");

contract('Lotto', (accounts) => {

  let lottoInstance;
  const eth = 1e18; //1 eth in wei units
  const tx_amount = 0.1*eth;

  it('Setup', async () => {
    lottoInstance = await Lotto.deployed();
  })

  async function checkState() {
    const reply = await lottoInstance.check();
    return {active: reply[0], balance: parseFloat(reply[1])}
  }

  it('Initial bet should activate and change balance of contract', async () => {

    await lottoInstance.sendTransaction({from:accounts[1], value:tx_amount});
    const res = await checkState();
    assert.equal(res.active, true, "Contract should be active after 1 bet is sent");
    assert.equal(tx_amount, res.balance, "Current balance not equal to sent amount");
  });

  it('Resolve bet', async () => {

    let balance_before = parseFloat(await web3.eth.getBalance(accounts[1]));
    await lottoInstance.sendTransaction({from:accounts[1], value:tx_amount});
    const res = await checkState();

    assert.equal(res.active, false, "Contract should be inactive after bet is resolved");
    assert.equal(0, res.balance, "Contract balance should be 0 after resolving bet");

    let balance_after = parseFloat(await web3.eth.getBalance(accounts[1]));
    const gasPrice = parseFloat(await web3.eth.estimateGas({to:lottoInstance.address, value:tx_amount}));
    balance_before += (tx_amount-gasPrice*3);
    balance_before = balance_before.toString().substring(0,4);
    balance_after = balance_after.toString().substring(0,4);

    assert.equal(balance_before, balance_after,
      "The total bet amount should be returned to the only contestant");
  });
});

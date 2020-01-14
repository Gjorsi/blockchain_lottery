const Lotto = artifacts.require("Lotto");

contract('Lotto', (accounts) => {

  let lottoInstance;
  const eth = 1e18; //1 eth in wei units
  const tx_amount = 0.1*eth;
  let receipt = []
  let gasPrice = []
  let balance_before;

  it('Setup', async () => {
    lottoInstance = await Lotto.deployed();
    balance_before = parseFloat(await web3.eth.getBalance(accounts[1]));
  })

  async function checkState() {
    const reply = await lottoInstance.check();
    return {active: reply[0], balance: parseFloat(reply[1])}
  }

  it('Initial bet should activate and change balance of contract', async () => {

    receipt.push(await lottoInstance.sendTransaction({from:accounts[1], value:tx_amount}));
    const res = await checkState();
    assert.equal(res.active, true, "Contract should be active after 1 bet is sent");
    assert.equal(tx_amount, res.balance, "Current balance not equal to sent amount");
  });

  it('Resolve bet', async () => {

    receipt.push(await lottoInstance.sendTransaction({from:accounts[1], value:tx_amount}));
    const res = await checkState();
    assert.equal(res.active, false, "Contract should be inactive after bet is resolved");
    assert.equal(0, res.balance, "Contract balance should be 0 after resolving bet");

    var total_gasCost = 0
    for(i=0; i<receipt.length; i++) {
      var tx = await web3.eth.getTransaction(receipt[i].tx);
      total_gasCost += receipt[i].receipt.gasUsed*tx.gasPrice;
    }

    //console.log(`Total GasCost: ${total_gasCost}`);

    let balance_after = parseFloat(await web3.eth.getBalance(accounts[1]));

    assert.equal(balance_before, balance_after+total_gasCost,
      "The total bet amount should be returned to the only contestant");
  });
});

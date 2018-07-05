const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    console.log(accounts);
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['hello']})
        .send({from: accounts[0], gas: 1000000})
})

describe('Inbox', () => {
    it('can get message', async () => {
        assert.ok(inbox.options.address);
        const msg = await inbox.methods.message().call();
        assert.equal(msg, 'hello');
        console.log(msg);
    });
    it('can setMessage', async () => {
        await inbox.methods.setMessage('world').send({from: accounts[0]});
        const msg = await inbox.methods.message().call();
        assert.equal(msg, 'world');
        console.log(msg);
    });
});

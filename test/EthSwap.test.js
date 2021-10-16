const Token = artifacts.require('Token');
const EthSwap = artifacts.require('EthSwap');
//code for automated test
require('chai')
    .use(require('chai-as-promised'))
    .should
    
function tokens(n){
    return web3.utils.toWei(n, 'ether');
}

contract('EthSwap', ([deployer, investor])=>{
    let token, ethSwap

    before(async () => {
        token = await Token.new()
        ethSwap = await EthSwap.new(token.address)
        await token.transfer(ethSwap.address, tokens('1000000'))
    })

    describe('Token deployment', async() => {
        it('contract has a name', async() => {
            const name = await token.name()
            assert.equal(name, 'DApp Token')
        })
    })

    describe('EthSwap deployment', async() => {
        it('contract has a name', async() => {
            const name = await ethSwap.name()
            assert.equal(name, 'EthSwap Instant Exchange')
        })
        it('contract has tokens', async () => {
            let balance = await token.balanceOf(ethSwap.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })

    describe('buyTokens()', async() => {
        let result
        before(async () => {
            //purchase tokens before each example
            result = await ethSwap.buyTokens({from : investor, value: web3.utils.toWei('1', 'ether')})
        })

        it ('Allows user to instantly purchase tokens from EthSwap with a fixed price', async()=>{
            //check investor token balance after purchase
        })
    })

})
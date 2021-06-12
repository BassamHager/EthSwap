const { assert } = require('chai')
const Web3 = require('web3')
let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");


require('chai').use(require('chai-as-promised')).should()

const tokens = (n) => web3.utils.toWei(n,'ether')

contract('EthSwap',([deployer,investor])=>{
let token, ethSwap;

    before(async()=>{
        token = await Token.new()
        ethSwap = await EthSwap.new(token.address)
        await token.transfer(ethSwap.address, tokens('1000000'))
    })

    describe('EthSwap deployment', async()=>{
        it('contract has a name', async()=>{
            const name = await ethSwap.name()
            assert.equal(name, 'EthSwap Instant Exchange')
        })
    })

    describe('Token deployment', async()=>{
        it('token has a name', async()=>{
            const name = await token.name()
            assert.equal(name, 'DApp Token')
        })

        it('contract has tokens', async()=>{
            let balance = await token.balanceOf(ethSwap.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })

    describe('buyTokens()', async()=>{
        let result;

        before(async()=>{
            // buy tokens
            result= await ethSwap.buyTokens({from:investor,value:web3.utils.toWei('1','ether')})
        })
        
        it('Allows user to instantly buys tokens from EthSwap for a fixed price',async()=>{
            // check investor tokens balance after purchase
            let investorBal = await token.balanceOf(investor)
            assert.equal(investorBal.toString(),tokens('100'))

            // check ethSwap balance after purchase
            let ethSwapBalance
            ethSwapBalance = await token.balanceOf(ethSwap.address)
            assert.equal(ethSwapBalance.toString(),tokens('999900'))

            //
            ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
            assert.equal(ethSwapBalance.toString(),web3.utils.toWei('1','Ether'))

            console.log(result.logs[0].args)
            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token,token.address)
            assert.equal(event.amount.toString(),tokens('100').toString())
            assert.equal(event.rate.toString(),'100')
            
        })
    })
    
})      
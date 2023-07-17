const { expect } = require("chai") ;

describe("Token Contract",function(){
    let Token;
    let hToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;
    beforeEach(async function(){
        Token = await ethers.getContractFactory("Token");
        [owner,addr1, addr2,...addrs] = await ethers.getSigners();
        hToken =await Token.deploy();
    })
    it("deployment should assign the total supply to owner", async function(){
        const ownerBalance = await hToken.balanceOf(owner.address);
        console.log("owner address:", owner.address);
        expect(await hToken.owner()).to.equal(owner.address);
        expect(await hToken.totalSupply()).to.equal(ownerBalance);
    })
    it("should transfer 100/50 tokens", async function(){
        //transfer 100 HT from owner to addr1 and 50 HT from addr1 to addr2
        await hToken.transfer(addr1.address, 100);
        await hToken.connect(addr1).transfer(addr2.address,50);

        expect(await hToken.balanceOf(addr1.address)).to.equal(50);
        expect(await hToken.balanceOf(addr2.address)).to.equal(50);
    })
    it("transfer should fail if not enough tokens present", async function(){
        const initialBalance = await hToken.balanceOf(owner.address);
        await expect (hToken.connect(addr1).transfer(owner.address,10)
        ).to.be.revertedWith("not enough balance to tranfer");
        expect(await hToken.balanceOf(owner.address)).to.equal(initialBalance); 
    })
})

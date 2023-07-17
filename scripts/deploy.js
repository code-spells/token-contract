async function main() {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    console.log("Contract Address ", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });
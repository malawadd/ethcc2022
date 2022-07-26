const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Booking = await hre.ethers.getContractFactory("Booking");
  const booking = await Booking.deploy();

  await booking.deployed();

  console.log("Sawti deployed to:", booking.address);

  fs.writeFileSync(
    "././config.js", `
    export const bookingAddress = "${booking.address}"`
  )

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

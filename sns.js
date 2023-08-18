//Installing the classes and pacakages we would need
const {
  getHashedName,
  getNameAccountKey,
  NameRegistryState,
} = require("@solana/spl-name-service");

const { Connection, PublicKey, clusterApiUrl } = require("@solana/web3.js");

//Domain name we want to look up
const accountName = "nomey.sol";

//To check for the validity of the signature we would recieve for the server
//Address of the SOL TLD
const SOL_TLD_AUTHORITY = new PublicKey(
  "58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx"
);

//To get to domain key and the hashed version of the domain to perform the name registry lookup
const getDomainKey = async (domain) => {
  let hashedDomain = await getHashedName(domain);
  let inpuDomainKey = await getNameAccountKey(
    hashedDomain,
    undefined,
    SOL_TLD_AUTHORITY
  );
  return { inpuDomainKey: inpuDomainKey, hashedInputName: hashedDomain };
};

const main = async () => {
  //Build connection to the blockchain
  const connection = new Connection(clusterApiUrl("mainnet-beta", "confirmed"));
  //Storing the values returned from the getDomainkey function in a variables
  const { inpuDomainKey } = await getDomainKey(accountName.replace(".sol", ""));
  const registry = await NameRegistryState.retrieve(connection, inpuDomainKey);
  console.log(registry.owner.toBase58());
};

main();

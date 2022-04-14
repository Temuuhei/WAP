const dns = require('dns');
dnsPromises = dns.promises;

async function test() {
  let data = await dnsPromises.lookup(("www.miu.edu"));
  console.log(data.address);
}

test();

// function lookup(domain) {
//     return new Promise((resolve, reject) => {
//       dns.lookup(address, (err, address, family) => {
//         if (err) {
//           reject(err)
//         } else {
//           resolve({ address, family })
//         }
//       })
//     })
//   }
  
//   async function test() {
//     let ipAddress = await lookup(("www.miu.edu"));
//   }
  
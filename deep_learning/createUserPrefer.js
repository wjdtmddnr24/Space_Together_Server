const fs = require('fs-extra');
const status = fs.readJsonSync('status.json');

for (let ii = 0; ii < 100; ii++) {
  const user = {id: status.length, prefer: []};
  let total = 1;
  user.prefer.push(-1);
  for (let i = 1; i <= 83; i++) {
    let rand = getRandomPrefer();
    while (rand > total) rand = getRandomPrefer();
    user.prefer.push(rand);
    total -= rand;
  }

  user.prefer.push(Math.round(total * 100) / 100);

  total = 0;
  for (let i = 1; i < user.prefer.length; i++) {
    total += user.prefer[i];
  }
  if (total != 1) {
    continue;
  }

  console.log(user);

  const permN = 1000;
  for (let i = 0; i < permN; i++) {
    const l = (Math.round(getRandomPrefer() * 100) % 84) + 1;
    const r = (Math.round(getRandomPrefer() * 100) % 84) + 1;
    const t = user.prefer[l];
    user.prefer[l] = user.prefer[r];
    user.prefer[r] = t;
  }
  console.log(user);

  function getRandomPrefer() {
    let ret = Math.floor(Math.random() * 100);
    ret /= 100;
    return ret;
  }

  status.push(user);
}

fs.writeJsonSync('status.json', status);

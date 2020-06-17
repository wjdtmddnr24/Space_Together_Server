const fs = require('fs-extra');
const status = fs.readJsonSync('status.json');
const history = fs.readJsonSync('history.json');
function getRandomRange(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function getRandom() {
  let ret = Math.floor(Math.random() * 100);
  ret /= 100;
  return ret;
}

function selectRestaurant(meetingIds) {
  const prefer = [-1];
  for (let i = 1; i < status[0].prefer.length; i++) {
    prefer.push(0);
    meetingIds.forEach((id) => {
      prefer[i] += status[id].prefer[i];
    });
    prefer[i] /= meetingIds.length;
  }
  const chance = getRandom();
  let sum = 0;
  for (let i = 1; i < prefer.length; i++) {
    if (sum < chance && chance <= sum + prefer[i]) {
      return i;
    }
    sum += prefer[i];
  }
}

function createHistory() {
  let meetingCnt = getRandomRange(1, 8);
  const meetingIds = [];
  while (meetingIds.length < meetingCnt) {
    const id = getRandomRange(0, status.length - 1);
    if (meetingIds.every((e) => e !== id)) {
      meetingIds.push(id);
    }
  }

  const ret = selectRestaurant(meetingIds);
  return {restaurant: ret, meetings: meetingIds};
}

for (let i = 0; i < 100000; i++) {
  history.push(createHistory());
}

fs.writeJsonSync('history.json', history);

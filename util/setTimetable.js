const axios = require('axios');
let startDate = new Date();
startDate.setHours(19);
console.log(startDate);
let endDate = new Date(startDate);
endDate.setHours(endDate.getHours() + 2);
axios
  .post('http://localhost:3000/user/jack?token=jack', {
    timetable: [
      {
        lectureName: '소프트웨어 프로젝트',
        schedule: [
          {startDate: startDate.getTime(), endDate: endDate.getTime()},
        ],
      },
    ],
  })
  .then(function (response) {
    // console.log(response);
  })
  .catch(function (error) {
    //console.log(error);
  });

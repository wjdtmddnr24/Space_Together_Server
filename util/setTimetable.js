const axios = require('axios');
axios
  .post('http://localhost:3000/user/jack?token=jack', {
    timetable: [
      {
        lectureName: '소프트웨어 프로젝트',
        schedule: [{startDate: Date.now(), endDate: Date.now()}],
      },
    ],
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

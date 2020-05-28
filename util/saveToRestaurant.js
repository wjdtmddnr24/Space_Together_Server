const restaurants = [
  {
    id: 1,
    name: '이모네',
  },
  {
    id: 2,
    name: '만나분식',
  },
  {
    id: 3,
    name: '황궁 쟁반짜장',
  },
  {
    id: 4,
    name: '추억과 김밥',
  },
  {
    id: 5,
    name: '고랭',
  },
  {
    id: 6,
    name: '왕돈까스 왕냉면',
  },
  {
    id: 7,
    name: '동경야네',
  },
  {
    id: 8,
    name: '숭실골',
  },
  {
    id: 9,
    name: '스톤 504',
  },
  {
    id: 10,
    name: '열정식당',
  },
  {
    id: 11,
    name: '코웍 비스트로',
  },
  {
    id: 12,
    name: '으리으리',
  },
  {
    id: 13,
    name: '논두렁',
  },
  {
    id: 14,
    name: '할매 순댓국',
  },
  {
    id: 15,
    name: '손칼국수',
  },
  {
    id: 16,
    name: '신의주 순댓국',
  },
  {
    id: 17,
    name: 'BHC',
  },
  {
    id: 18,
    name: '은화수',
  },
  {
    id: 19,
    name: '맥도날드',
  },
  {
    id: 20,
    name: '봉구스 밥버거',
  },
  {
    id: 21,
    name: 'The 진국',
  },
  {
    id: 22,
    name: '명품 고향 삼계탕',
  },
  {
    id: 23,
    name: '찌개대학 부대학과',
  },
  {
    id: 24,
    name: '씨밤바베',
  },
  {
    id: 25,
    name: '설쌈냉면',
  },
  {
    id: 26,
    name: '연래춘',
  },
  {
    id: 27,
    name: '미담길',
  },
  {
    id: 28,
    name: '멘동',
  },
  {
    id: 29,
    name: '현선이네',
  },
  {
    id: 30,
    name: 'DD치킨',
  },
  {
    id: 31,
    name: '지지고',
  },
  {
    id: 32,
    name: '청운식당',
  },
  {
    id: 33,
    name: '아영이네',
  },
  {
    id: 34,
    name: '만복국수',
  },
  {
    id: 35,
    name: '따듯한밥상',
  },
  {
    id: 36,
    name: '내찜닭',
  },
  {
    id: 37,
    name: '피자왕자 치킨공주',
  },
  {
    id: 38,
    name: '도쿄라멘 3900',
  },
  {
    id: 39,
    name: '우마이',
  },
  {
    id: 40,
    name: '크라이 치즈버거',
  },
  {
    id: 41,
    name: '아리랑 컵밥',
  },
  {
    id: 42,
    name: '항아리',
  },
  {
    id: 43,
    name: '꿀마니',
  },
  {
    id: 44,
    name: '밀알',
  },
  {
    id: 45,
    name: '청년다방',
  },
  {
    id: 46,
    name: '탕화쿵푸',
  },
  {
    id: 47,
    name: '더코네',
  },
  {
    id: 48,
    name: '미스사이공',
  },
  {
    id: 49,
    name: '아키라',
  },
  {
    id: 50,
    name: '서브웨이',
  },
  {
    id: 51,
    name: '도스마스',
  },
  {
    id: 52,
    name: '초밥이야기',
  },
  {
    id: 53,
    name: '판다탕요',
  },
  {
    id: 54,
    name: '고기스토리',
  },
  {
    id: 55,
    name: '샤로스톤',
  },
  {
    id: 56,
    name: '889',
  },
  {
    id: 57,
    name: '이삭토스트',
  },
  {
    id: 58,
    name: '김가네',
  },
  {
    id: 59,
    name: '오니기리',
  },
  {
    id: 60,
    name: '취향',
  },
  {
    id: 61,
    name: '풍년집',
  },
  {
    id: 62,
    name: '리얼 후라이',
  },
  {
    id: 63,
    name: '본죽',
  },
  {
    id: 64,
    name: '가마로',
  },
  {
    id: 65,
    name: '준호네',
  },
  {
    id: 66,
    name: '피자스쿨',
  },
  {
    id: 67,
    name: '엄마손분식',
  },
  {
    id: 68,
    name: '아쯔다무라',
  },
  {
    id: 69,
    name: '임종례',
  },
  {
    id: 70,
    name: '걸작',
  },
  {
    id: 71,
    name: '아라쭈꾸미',
  },
  {
    id: 72,
    name: '신전떡볶이',
  },
  {
    id: 73,
    name: '미주알고주알',
  },
  {
    id: 74,
    name: '고돼지',
  },
  {
    id: 75,
    name: '고피자',
  },
  {
    id: 76,
    name: '엽기떡볶이',
  },
  {
    id: 77,
    name: '소금구이',
  },
  {
    id: 78,
    name: '마루스시',
  },
  {
    id: 79,
    name: '피탕김탕',
  },
  {
    id: 80,
    name: '다가미 김밥',
  },
  {
    id: 81,
    name: '청년피자',
  },
  {
    id: 82,
    name: '광어삼촌',
  },
  {
    id: 83,
    name: '고우마구로',
  },
];

const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
  console.log('Connected to DB');
  exec().then();
});

mongoose.connect('mongodb://odyssey:odyssey2020!@115.68.221.40:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

async function exec() {
  for (let i = 0; i < restaurants.length; i++) {
    console.log(restaurants[i]);
    await new Restaurant(restaurants[i]).save();
  }
}

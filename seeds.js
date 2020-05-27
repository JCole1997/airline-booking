var mongoose = require("mongoose");
var Airline = require("./models/airline");

var seeds = [
  {
    name: "中国联合航空KN5955",
    leaveCity: "北京",
    arriveCity: "上海",
    leaveAirport: "大兴国际机场",
    arriveAirport: "虹桥国际机场T2",
    date: "05/20/2020",
    leaveTime: "06:50",
    arriveTime: "09:05",
    capacity: "158",
    price: "480",
    bookSum: "0",
  },
  {
    name: "中国国航CA1831",
    leaveCity: "北京",
    arriveCity: "上海",
    leaveAirport: "首都国际机场T3",
    arriveAirport: "浦东国际机场T2",
    date: "05/20/2020",
    leaveTime: "08:00",
    arriveTime: "10:15",
    capacity: "158",
    price: "720",
    bookSum: "0",
  },
  {
    name: "南方航空CZ6545",
    leaveCity: "北京",
    arriveCity: "上海",
    leaveAirport: "首都国际机场T2",
    arriveAirport: "虹桥国际机场T2",
    date: "05/20/2020",
    leaveTime: "12:00",
    arriveTime: "14:10",
    capacity: "158",
    price: "880",
    bookSum: "0",
  },
  {
    name: "中国国航CA1501",
    leaveCity: "北京",
    arriveCity: "上海",
    leaveAirport: "首都国际机场T3",
    arriveAirport: "虹桥国际机场T2",
    date: "05/20/2020",
    leaveTime: "20:20",
    arriveTime: "22:35",
    capacity: "158",
    price: "648",
    bookSum: "0",
  },
  {
    name: "厦门航空MF8187",
    leaveCity: "北京",
    arriveCity: "广州",
    leaveAirport: "大兴国际机场",
    arriveAirport: "白云国际机场T2",
    date: "05/20/2020",
    leaveTime: "08:00",
    arriveTime: "11:20",
    capacity: "158",
    price: "400",
    bookSum: "0",
  },
  {
    name: "南方航空CZ3100",
    leaveCity: "北京",
    arriveCity: "广州",
    leaveAirport: "首都国际机场T2",
    arriveAirport: "白云国际机场T2",
    date: "05/20/2020",
    leaveTime: "18:30",
    arriveTime: "21:35",
    capacity: "158",
    price: "520",
    bookSum: "0",
  },
  {
    name: "海南航空HU7701",
    leaveCity: "北京",
    arriveCity: "深圳",
    leaveAirport: "首都国际机场T2",
    arriveAirport: "宝安国际机场T3",
    date: "05/20/2020",
    leaveTime: "16:00",
    arriveTime: "19:20",
    capacity: "158",
    price: "595",
    bookSum: "0",
  },
  {
    name: "中国国航CA1303",
    leaveCity: "北京",
    arriveCity: "深圳",
    leaveAirport: "首都国际机场T2",
    arriveAirport: "宝安国际机场T3",
    date: "05/20/2020",
    leaveTime: "13:15",
    arriveTime: "16:55",
    capacity: "158",
    price: "630",
    bookSum: "0",
  },
  {
    name: "深圳航空ZH9106",
    leaveCity: "北京",
    arriveCity: "深圳",
    leaveAirport: "首都国际机场T2",
    arriveAirport: "宝安国际机场T3",
    date: "05/21/2020",
    leaveTime: "16:55",
    arriveTime: "20:15",
    capacity: "158",
    price: "600",
    bookSum: "0",
  },
];

async function seedDB() {
    await Airline.deleteMany({});
    console.log("removed airlines!");

    for(const seed of seeds) {
        let airline = await Airline.create(seed);
        console.log("added a airline");
        airline.save();
    }
}

module.exports = seedDB;
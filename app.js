let currentDlt = "";
let currentSsq = "";

function randomNumbers(count, max) {
  let nums = [];

  while (nums.length < count) {
    let n = Math.floor(Math.random() * max) + 1;

    if (!nums.includes(n)) {
      nums.push(n);
    }
  }

  return nums.sort((a, b) => a - b);
}

function format(nums) {
  return nums.map(n => String(n).padStart(2, '0')).join(' ');
}

function generateDlt() {
  let front = randomNumbers(5, 35);
  let back = randomNumbers(2, 12);

  currentDlt = `${format(front)} + ${format(back)}`;

  document.getElementById("dlt-result").innerText = currentDlt;
}

function generateSsq() {
  let red = randomNumbers(6, 33);
  let blue = randomNumbers(1, 16);

  currentSsq = `${format(red)} + ${format(blue)}`;

  document.getElementById("ssq-result").innerText = currentSsq;
}

function saveDlt() {
  if (!currentDlt) return;

  saveRecord("大乐透", currentDlt);
}

function saveSsq() {
  if (!currentSsq) return;

  saveRecord("双色球", currentSsq);
}

function saveRecord(type, numbers) {
  let records = JSON.parse(localStorage.getItem("records")) || [];

  records.unshift({
    type,
    numbers,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("records", JSON.stringify(records));

  loadRecords();
}

function loadRecords() {
  let records = JSON.parse(localStorage.getItem("records")) || [];

  let html = "";

  records.forEach(r => {
    html += `
      <div class="record-item">
        <strong>${r.type}</strong><br>
        ${r.numbers}<br>
        <small>${r.time}</small>
      </div>
    `;
  });

  document.getElementById("records").innerHTML = html;
}

loadRecords();
async function loadLotteryData() {

  try {

    // 大乐透
    const dltRes = await fetch(
      "https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&pageSize=1&pageNo=1"
    );

    const dltJson = await dltRes.json();

    const dlt = dltJson.value.list[0];

    document.getElementById("dlt-history").innerHTML = `
      <p>期号：${dlt.lotteryDrawNum}</p>
      <p>${dlt.lotteryDrawResult}</p>
      <p>开奖日期：${dlt.lotteryDrawTime}</p>
    `;

    // 双色球
    const ssqRes = await fetch(
      "https://www.cwl.gov.cn/cwl_admin/front/cwlkj/search/kjxx/findDrawNotice?name=ssq&issueCount=1"
    );

    const ssqJson = await ssqRes.json();

    const ssq = ssqJson.result[0];

    document.getElementById("ssq-history").innerHTML = `
      <p>期号：${ssq.code}</p>
      <p>${ssq.red} + ${ssq.blue}</p>
      <p>开奖日期：${ssq.date}</p>
    `;

  } catch (e) {

    console.log(e);

    document.getElementById("dlt-history").innerHTML =
      "大乐透数据加载失败";

    document.getElementById("ssq-history").innerHTML =
      "双色球数据加载失败";
  }
}
loadLotteryData();
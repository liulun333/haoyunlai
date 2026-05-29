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

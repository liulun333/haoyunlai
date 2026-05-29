```javascript
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

// 大乐透
function generateDlt() {

  let front = randomNumbers(5, 35);

  let back = randomNumbers(2, 12);

  currentDlt = `${format(front)} + ${format(back)}`;

  document.getElementById("dlt-result").innerText = currentDlt;
}

// 双色球
function generateSsq() {

  let red = randomNumbers(6, 33);

  let blue = randomNumbers(1, 16);

  currentSsq = `${format(red)} + ${format(blue)}`;

  document.getElementById("ssq-result").innerText = currentSsq;
}

// 保存大乐透
function saveDlt() {

  if (!currentDlt) return;

  saveRecord("大乐透", currentDlt);
}

// 保存双色球
function saveSsq() {

  if (!currentSsq) return;

  saveRecord("双色球", currentSsq);
}

// 保存记录
function saveRecord(type, numbers) {

  let records =
    JSON.parse(localStorage.getItem("records")) || [];

  records.unshift({
    id: Date.now(),
    type,
    numbers,
    time: new Date().toLocaleString()
  });

  localStorage.setItem(
    "records",
    JSON.stringify(records)
  );

  loadRecords();
}

// 加载记录
function loadRecords() {

  let records =
    JSON.parse(localStorage.getItem("records")) || [];

  let html = "";

  if (records.length === 0) {

    html = `
      <p style="text-align:center;color:#999;">
        暂无记录
      </p>
    `;

  } else {

    records.forEach(r => {

      html += `
        <div class="record-item">

          <div class="record-top">

            <strong>${r.type}</strong>

            <div class="record-buttons">

              <button class="small-btn"
                onclick="editRecord(${r.id})">
                编辑
              </button>

              <button class="small-btn delete-btn"
                onclick="deleteRecord(${r.id})">
                删除
              </button>

            </div>

          </div>

          <div class="numbers">
            ${r.numbers}
          </div>

          <small>${r.time}</small>

        </div>
      `;
    });
  }

  document.getElementById("records").innerHTML =
    html;
}

// 删除
function deleteRecord(id) {

  let records =
    JSON.parse(localStorage.getItem("records")) || [];

  records = records.filter(r => r.id !== id);

  localStorage.setItem(
    "records",
    JSON.stringify(records)
  );

  loadRecords();
}

// 编辑
function editRecord(id) {

  let records =
    JSON.parse(localStorage.getItem("records")) || [];

  let record = records.find(r => r.id === id);

  let newNumbers = prompt(
    "修改号码",
    record.numbers
  );

  if (!newNumbers) return;

  record.numbers = newNumbers;

  localStorage.setItem(
    "records",
    JSON.stringify(records)
  );

  loadRecords();
}

loadRecords();
```

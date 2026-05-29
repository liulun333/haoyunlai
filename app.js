```javascript
alert("新版JS已加载");

let currentDlt = "";
let currentSsq = "";

function randomNumbers(count, max) {

  let arr = [];

  while (arr.length < count) {

    let num = Math.floor(Math.random() * max) + 1;

    if (arr.indexOf(num) === -1) {

      arr.push(num);
    }
  }

  arr.sort(function(a, b) {

    return a - b;
  });

  return arr;
}

function format(arr) {

  let result = [];

  for (let i = 0; i < arr.length; i++) {

    let num = arr[i].toString();

    if (num.length < 2) {

      num = "0" + num;
    }

    result.push(num);
  }

  return result.join(" ");
}

function generateDlt() {

  let front = randomNumbers(5, 35);

  let back = randomNumbers(2, 12);

  currentDlt =
    format(front)
    + " + "
    + format(back);

  document.getElementById(
    "dlt-result"
  ).innerHTML = currentDlt;
}

function generateSsq() {

  let red = randomNumbers(6, 33);

  let blue = randomNumbers(1, 16);

  currentSsq =
    format(red)
    + " + "
    + format(blue);

  document.getElementById(
    "ssq-result"
  ).innerHTML = currentSsq;
}
```

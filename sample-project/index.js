import sample, { formatTime } from "@hoge/sample-module";

const fuga = () => {
  const result = sample.hoge(5);
  console.log(result); // -> 10

  const dateStr = formatTime(new Date()); // -> 20221019
  console.log(dateStr);
}

fuga();
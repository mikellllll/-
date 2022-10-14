export { getData };
const getData = await (async function () {
  const data = await fetch("https://api.iynn.cn/mock?t=2");
  const reult = await data.json();
  return reult;
})();

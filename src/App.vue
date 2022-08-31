<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

:root {
  --edcan-blue : #00b8d4;
  --edcan-navy : #455A64;
}

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: 'Pretendard-Regular',serif;
  word-break: break-word;
}

.page {
  width: 100%;
  height: 100vh;
  max-width: 500px;

  margin : 0 auto;
}

button {
  width: 100%;

  color: white;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 2px;

  padding: 18px;

  border: 1px solid #00b8d4;
  border-radius: 15px;

  background-color: #00b8d4;

  cursor: pointer;
}

input {
  width: 100%;

  color: black;
  font-size: 22px;
  font-weight: 400;
  letter-spacing: 2px;

  padding: 18px;

  border: 1px solid #E9E9E9;
  border-radius: 15px;

  background-color: #E9E9E9;
}

input:focus {
  outline: 0px;
}

input[placeholder] {
  color: #949494;
}
</style>

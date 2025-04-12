const charu = arr => {
  for (let i in arr) {
    let j = i
    const temp = arr[j]
    while (j > 0) {
      if (arr[j - 1] > temp) {
        arr[j] = arr[j - 1]
      } else {
        break
      }
      j--
    }
    arr[j] = temp
  }
  return arr
}

const kuaipai = arr => {
  if (arr.length <= 1) return arr
  const baseNum = arr.splice(0, 1)
  const leftArr = [],
    rightArr = []

  for (let item of arr) {
    if (item < baseNum) {
      leftArr.push(item)
    } else {
      rightArr.push(item)
    }
  }
  return kuaipai(leftArr).concat(baseNum, kuaipai(rightArr))
}

// console.log(charu([2, 3, 1, 6, 3, 11, 6, 3, 2, 0, 3]))

// console.log(kuaipai([2, 3, 1, 6, 3, 11, 6, 3, 2, 0, 3]))

const MyInstanceOf = (left, right) => {
  let l = left.__proto__
  const r = right.prototype
  while (true) {
    if (!l) return false
    if (l === r) return true
    l = l.__prototype__
  }
}

const fangdou = (fn, args = [], time = 1000, immediate = false) => {
  let timer = null
  let isImmediateCalled = false
  return () => {
    if (immediate && !isImmediateCalled) {
      fn(...args)
      isImmediateCalled = true
    } else {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => fn(...args), time)
    }
  }
}

const jieliu = (fn, args = [], time) => {
  let oldTime = 0
  return () => {
    const newTime = new Date().getTime()
    if (newTime - oldTime > time) {
      oldTime = newTime
      return fn(...args)
    }
  }
}

const MySetInterval = (fn, args = [], time) => {
  let timer = null
  const deep = () => {
    fn(...args)
    timer = setTimeout(deep, time)
  }
  timer = setTimeout(deep, time)
}

const timeFun = () => {
  console.log('time')
}

MySetInterval(timeFun, [], 1000)

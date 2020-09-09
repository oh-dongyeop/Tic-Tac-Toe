export default function isEnd(
  current: (string | null)[],
  size: number,
  mode: number,
  point: number
) {
  if (mode === 5) {
    for (let i = 0; i < current.length; i++) {
      if (current[i]) {
        const pattern: number[][] = [
          i % size <= size - mode ? [i, i + 1, i + 2, i + 3, i + 4] : [0, 1, 2, 3, 4],
          [i, i + size, i + size * 2, i + size * 3, i + size * 4],
          i % size <= size - mode
            ? [i, i + size + 1, i + (size + 1) * 2, i + (size + 1) * 3, i + (size + 1) * 4]
            : [0, 1, 2, 3, 4],
          i % size <= size - mode
            ? [i, i - size + 1, i - (size - 1) * 2, i - (size - 1) * 3, i - (size - 1) * 4]
            : [0, 1, 2, 3, 4],
        ]
        for (let j = 0; j < 4; j++) {
          if (
            current[pattern[j][0]] &&
            current[pattern[j][0]] === current[pattern[j][1]] &&
            current[pattern[j][1]] === current[pattern[j][2]] &&
            current[pattern[j][2]] === current[pattern[j][3]] &&
            current[pattern[j][3]] === current[pattern[j][4]]
          ) {
            return current[pattern[j][0]] + " Victory!!"
          }
        }
      }
    }
  } else if (mode === 4) {
    for (let i = 0; i < current.length; i++) {
      if (current[i]) {
        const pattern: number[][] = [
          i % size <= size - mode ? [i, i + 1, i + 2, i + 3] : [0, 1, 2, 3],
          [i, i + size, i + size * 2, i + size * 3],
          i % size <= size - mode
            ? [i, i + size + 1, i + (size + 1) * 2, i + (size + 1) * 3]
            : [0, 1, 2, 3],
          i % size <= size - mode
            ? [i, i - size + 1, i - (size - 1) * 2, i - (size - 1) * 3]
            : [0, 1, 2, 3],
        ]
        for (let j = 0; j < 4; j++) {
          if (
            current[pattern[j][0]] &&
            current[pattern[j][0]] === current[pattern[j][1]] &&
            current[pattern[j][1]] === current[pattern[j][2]] &&
            current[pattern[j][2]] === current[pattern[j][3]]
          ) {
            return current[pattern[j][0]] + " Victory!!"
          }
        }
      }
    }
  } else if (mode === 3) {
    for (let i = 0; i < current.length; i++) {
      if (current[i]) {
        const pattern: number[][] = [
          i % size <= size - mode ? [i, i + 1, i + 2] : [0, 1, 2],
          [i, i + size, i + size * 2],
          i % size <= size - mode ? [i, i + size + 1, i + (size + 1) * 2] : [0, 1, 2],
          i % size <= size - mode ? [i, i - size + 1, i - (size - 1) * 2] : [0, 1, 2],
        ]
        for (let j = 0; j < 4; j++) {
          if (
            current[pattern[j][0]] &&
            current[pattern[j][0]] === current[pattern[j][1]] &&
            current[pattern[j][1]] === current[pattern[j][2]]
          ) {
            return current[pattern[j][0]] + " Victory!!"
          }
        }
      }
    }
  }
  if (point === size * size) {
    return "Draw!!"
  } else {
    return point % 2 === 0 ? "현재 턴 : X" : "현재 턴 : O"
  }
}

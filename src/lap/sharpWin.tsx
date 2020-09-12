/**
 * export default function sharpWin(
    current: (string | null)[],
    size: number,
    mode: number,
    turn: string | null
  ) {
    let newCurrent = current;
    for (let i = 0; i < newCurrent.length; i++) {
      const pattern: number[][] = [
        i % size <= size - mode ? [i, i + 1, i + 2] : [0, 1, 2],
        [i, i + size, i + size * 2],
        i % size <= size - mode ? [i, i + size + 1, i + (size + 1) * 2] : [0, 1, 2],
        i % size <= size - mode ? [i, i - size + 1, i - (size - 1) * 2] : [0, 1, 2],
      ]
      for (let j = 0; j < 4; j++) {
        for(let k = 0; k < 3 ; k++){
          if(newCurrent[pattern[j][k]] !== "#"){
            if(newCurrent[pattern[j][k]] === (turn==="X"?"O":"X")){
              break;
            }
          }
        }
        for(let l = 0; l < 3 ; l++){
          if(pattern[j][l]<0 || pattern[j][l] > 8){
            break;
          }else{
            if(!newCurrent[pattern[j][l]]){
              newCurrent[pattern[j][l]] = "#"
            }
          }
        }
      }
    }
    return newCurrent;
  }
  */

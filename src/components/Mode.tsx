import React from "react";

interface ModeProps {
  changeMode: (size: number, mode: number) => void;
}

function Mode(props: ModeProps) {
  const [size, setSize] = React.useState(3);
  const [mode, setMode] = React.useState(3);

  const sizeArr: number[] = [];
  for (let i = 3; i < 10; i++) {
    sizeArr.push(i);
  }
  const sizeList = sizeArr.map((value, index) => {
    return (
      <span key={index}>
        <input type="radio" name="size" onClick={() => setSize(value)} />
        <span>{`${value}x${value}`}</span>
      </span>
    );
  });
  const modeArr: number[] = [];
  for (let i = 3; i < 6; i++) {
    modeArr.push(i);
  }
  const modeList = modeArr.map((value, index) => {
    return (
      <span key={index}>
        <input type="radio" name="mode" onClick={() => setMode(value)} />
        <span>{`${value}목`}</span>
      </span>
    );
  });
  return (
    <div>
      <div>{sizeList}</div>
      <div>{modeList}</div>
      <button onClick={() => props.changeMode(size, mode)}>변경</button>
    </div>
  );
}

export default Mode;

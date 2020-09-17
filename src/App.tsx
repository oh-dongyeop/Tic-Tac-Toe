import React, { useState } from "react";
import "./App.css";

import Board from "./components/Board";
import Mode from "./components/Mode";
import History from "./components/History";
import Message from "./components/Message";

import isEnd from "./isEnd";

function App() {
  const [size, setSize] = useState<number>(3);
  const [mode, setMode] = useState<number>(3);
  const [history, setHistory] = useState<(string | null)[][]>([
    Array(9).fill(null),
  ]);
  const [point, setPoint] = useState<number>(0);
  const [turn, setTurn] = useState<string>("X");

  const newHistory: (string | null)[][] = history.slice(0, point + 1);
  const current: (string | null)[] = newHistory[newHistory.length - 1].slice();

  function changeMode(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const newSize = Number(target.size.value);
    const newMode = Number(target.mode.value);
    if (newSize && newMode && newMode <= newSize) {
      setSize(newSize);
      setMode(newMode);
      setHistory([Array(newSize * newSize).fill(null)]);
      setPoint(0);
      setTurn("X");
    } else {
      alert("값 입력 오류 // 보드 사이즈를 늘리세요.");
    }
  }

  function handleClick(i: number): void {
    if (
      (!current[i] || current[i] === "#") &&
      !isEnd(current, size, mode, point).includes("Victory")
    ) {
      current[i] = turn;
      setHistory(newHistory.concat([current]));
      setTurn(turn === "X" ? "O" : "X");
      setPoint(newHistory.length);
    }
  }

  function jumpTo(i: number): void {
    setPoint(i);
    setTurn(i % 2 === 0 ? "X" : "O");
  }

  function reset(): void {
    setHistory([Array(size * size).fill(null)]);
    setPoint(0);
    setTurn("X");
  }

  return (
    <div className="App">
      <header>
        <span>
          현재 모드 : {size} X {size} / {mode}목
        </span>
        <Mode onSubmit={changeMode} />
      </header>
      <section className="Main">
        <article className="Board">
          <Board size={size} boxes={current} onClick={handleClick} />
        </article>
        <article className="History">
          <Message value={isEnd(current, size, mode, point)} />
          <History
            history={history}
            onClick={jumpTo}
            reset={reset}
            point={point}
          />
        </article>
      </section>
    </div>
  );
}

export default App;

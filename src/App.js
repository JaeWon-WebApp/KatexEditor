import { useEffect, useRef, useState } from 'react';
import './App.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import 'katex/dist/katex.min.css';
import TexEditor from './TexEditor';

function App() {
  const [boardWrite, setBoardWrite] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [range, setRange] = useState(null);
  const boardRef = useRef();
  const katexPreRef = useRef();

  useEffect(() => {
    renderMathInElement(katexPreRef.current, {
      delimiters: [{ left: "$$", right: "$$", display: false },]
    });
  }, [boardWrite]);

  const texEditorOpen = () => {
    let selection = window.getSelection().containsNode(boardRef.current, true);
    if (!selection)
      boardRef.current.focus();
    setRange(window.getSelection().getRangeAt(0));
    setModalOpen(true);
  };

  const texEditorClose = () => {
    setBoardWrite(boardRef.current.textContent);
    setModalOpen(false);
  }

  return (
    <>
      <div id="boardWrapper">
        <div id="bar">
          <button onClick={texEditorOpen}>수식</button>
        </div>
        <div id="board" ref={boardRef} contentEditable onInput={(e) => setBoardWrite(e.currentTarget.textContent)}>
        </div>
        <div id="boardPre" ref={katexPreRef}>
          {boardWrite}
        </div>
      </div>
      {
        modalOpen &&
        <TexEditor
          texEditorClose={texEditorClose}
          range={range}
        />
      }
    </>
  );
}

export default App;

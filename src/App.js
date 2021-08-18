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
  const katexPreviewRef = useRef();

  useEffect(() => {
    renderMathInElement(katexPreviewRef.current);
  }, [boardWrite]);

  const texEditorOpen = () => {
    let selection = window.getSelection().containsNode(boardRef.current, true);
    if(!selection)
      boardRef.current.focus();
    setRange(window.getSelection().getRangeAt(0));
    setModalOpen(true);
  };

  const texEditorClose = () => {
    setModalOpen(false);
  }

  const boardChange = (e) => {
    console.log(boardWrite);
    setBoardWrite(e.target.value);
  }

  return (
    <>
      <div id="boardWrapper">
        <div id="bar">
          <button onClick={texEditorOpen}>수식</button>
        </div>
        <textarea id="board" ref={boardRef} value={boardWrite} onChange={boardChange}>

        </textarea>
        <div id="boardPreview" ref={katexPreviewRef}>
          {boardWrite}
        </div>
      </div>
      {modalOpen &&
        <TexEditor
          texEditorClose={texEditorClose}
          range={range}
        />
      }
    </>
  );
}

export default App;

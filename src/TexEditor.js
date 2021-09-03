import React, { useEffect, useRef, useState } from 'react';
import './TexEditor.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';

function TexEditor(props) {
  const texs = ["x_x", "x^y", "\\frac{2}{3}", "\\boxed{\\pi=\\frac c d}", "\\infty", "\\to", "\\gets", "\\sqrt{2}"];
  const [texStr, setTexStr] = useState("");
  const previewRef = useRef();

  useEffect(() => {
    const renderTex = () => {
      katex.render(texStr, previewRef.current, {
        throwOnError: false,
      });
    };

    renderTex();
  }, [texStr]);

  const texChange = (e) => {
    console.log(e.target.value);
    setTexStr(e.target.value);
  }

  const insertTex = () => {
    let node = document.createTextNode(`$${texStr}$`);
    props.range.deleteContents();
    props.range.insertNode(node);
    modalClose();
  }

  const modalClose = () => {
    setTexStr("");
    props.texEditorClose();
  }

  return (
    <>
      <div id="texWrapper">
        <div id="texEditor">
          <div id="texBar">
            <div id="texBtnArea">
              {texs.map((tex, index) => (
                <button key={index} className="texBtn" onClick={() => setTexStr(texStr + tex)}>
                  <img src={`images/${index + 1}.png`} alt="" />
                </button>
              ))}
            </div>
          </div>
          <div id="writeArea">
            <div id="writePreview" ref={previewRef}>
            </div>
            <textarea id="texWrite" value={texStr} onChange={texChange} />
          </div>
          <div id="insertCloseBtn">
            <button onClick={insertTex}>입력</button>
            <button onClick={modalClose}>닫기</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TexEditor

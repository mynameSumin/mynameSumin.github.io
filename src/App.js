/* eslint-disable */

import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  //자바스크립트의 destructing 문법과 같음
  //let a = num[0]; let b = num[1]; 이거를 아래와 같이 표현
  //let [a, b] = [1, 2] -> destructing 문법
  let [list, setList] = useState([
    "내일 할 일",
    "시험 준비 과정",
    "리액트 공부",
  ]);
  let [date, setDate] = useState([
    "2022년 11월 22일",
    "2022년 3월 14일",
    "2021년 5월 20일",
  ]);
  let [write, setWrite] = useState([
    "공부공부 또 공부",
    "아직 시험 준비를 안해서 모르게따",
    "리액트 너무 헷갈려!~",
  ]);
  let [like, setLike] = useState([0, 0, 0]); //좋아요 개수
  let [modal, setModal] = useState([false, false, false]); //모달 표시
  let [textValue, setTextValue] = useState(""); //글 제목 가져오기 위한 usestate
  let [writingValue, setWritingValue] = useState(""); //글 내용 가져오기 위한 usestate

  function openModal(i) {
    let copy = [...modal];

    if (modal[i] == false) {
      //모달창이 닫혀있으면 열려있던 모달창 닫고 선택된 모달창 열기
      for (let j = 0; j < modal.length; j++) {
        copy[j] = false;
      }
      copy[i] = true;
      setModal(copy);
    } else {
      //모달창 열려있으면 닫아주기
      copy[i] = false;
      setModal(copy);
    }
  }

  const onChange = (e) => {
    setTextValue(e.target.value);
  };

  const onWritingChange = (e) => {
    setWritingValue(e.target.value);
  };

  const currentDate = () => {
    //현재 날짜 생성
    let date = new Date();
    let day = String(date.getDate());
    let month = date.getMonth() + 1;
    month = month.toString();
    let year = date.getFullYear().toString();
    let fullDate = year + "년 " + month + "월 " + day + "일";
    return fullDate;
  };

  const onCreate = (e) => {
    if (textValue.replace(/ /g, "").length != 0) {
      if (writingValue.replace(/ /g, "").length != 0) {
        const fullDate = currentDate();
        setDate([fullDate, ...date]);
        setLike([0, ...like]);
        setModal([false, ...modal]);

        // 제목 추가
        let copy1 = [...list];
        copy1.unshift(textValue);
        setTextValue("");
        setList(copy1);

        //내용 추가
        let copy2 = [...write];
        copy2.unshift(writingValue);
        setWritingValue("");
        setWrite(copy2);
      } else {
        alert("내용을 입력하세요");
        setTextValue("");
        setWritingValue("");
      }
    } else {
      alert("제목을 입력하세요");
      setTextValue("");
      setWritingValue("");
    }
  };

  const deleteWrite = (i) => {
    let copy = [...list];
    copy.splice(i, 1);
    setList(copy);

    let copy2 = [...like];
    copy2.splice(i, 1);
    setLike(copy2);

    let copy3 = [...write];
    copy3.splice(i, 1);
    setWrite(copy3);

    let copy4 = [...modal];
    copy4.splice(i, 1);
    setModal(copy4);

    let copy5 = [...date];
    copy5.splice(i, 1);
    setDate(copy5);
  };

  return (
    <div className="App">
      <div className="black-nav">밍숭맹숭의 블로그</div>
      {/* <div id='arrayList'>
      <button id='arrayButton'onClick={arrayList}>가나다순 정렬</button>
      </div> */}

      {/* state는 변경되면 자동 렌더링됨 */}

      {list.map((a, i) => {
        let copy = [...like];
        copy[i] = copy[i] + 1;
        return (
          <div key={i} className="list">
            <button className="title" onClick={() => openModal(i)}>
              {a}
            </button>
            {/*파라미터 2개 넣으면 두 번째는 0부터 1씩 증가하는 정수*/}
            <p className="list-info">
              <span>{date[i]}</span>
              <button
                className="like"
                onClick={(e) => {
                  setLike(copy);
                }}
              >
                ❤ {like[i]}
                <button
                  id="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteWrite(i);
                  }}
                >
                  글삭제
                </button>
              </button>
            </p>
          </div>
        );
      })}

      {/* if, for문 실행 안됨 삼항연산자만 가능*/}
      <ReturnModal modal={modal} date={date} list={list} write={write} />

      {/* 글 추가 */}
      <div className="container">
        <div className="writing">
          <input
            id="writingTitle"
            value={textValue}
            placeholder=" 제목을 입력하세요"
            onChange={onChange}
          ></input>
          <button id="writingButton" type="submit" onClick={onCreate}>
            등록
          </button>
        </div>
        <textarea
          id="writingBox"
          value={writingValue}
          placeholder=" 내용을 입력하세요"
          onChange={onWritingChange}
        ></textarea>
      </div>
    </div>
  );
}

const ReturnModal = (props) => {
  let a;
  for (let i = 0; i < props.modal.length; i++) {
    if (props.modal[i] == true) {
      a = (
        <Modal
          date={props.date[i]}
          list={props.list[i]}
          write={props.write[i]}
        />
      );
    }
  }
  return a;
};

const Modal = (props) => {
  return (
    <div className="modal">
      <h4 id="detail">{props.list}</h4>
      <p>{props.date}</p>
      <p>{props.write}</p>
    </div>
  );
};

export default App;

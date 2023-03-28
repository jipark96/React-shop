import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store";


//[예전 방식]
// class Detail2 extends React.Component {
//   componentDidMount() {
//   }
//   componentDidUpdate() {
//   }
//   componentWillUnmount {
//   }
// }


function Detail(props) {
  let [detailFade, setDetailFade] = useState('');
  let [alert1, setAlert1] = useState(true);
  let [count, setCount] = useState(0);
  let [num, setNum] = useState('');
  let [tab, setTab] = useState(0);
  let {id} = useParams();
  let findShoes = props.shoes.find(function(x) {
    return (
      x.id == id
    )
  });

  let state = useSelector((state) => state)
  let dispatch = useDispatch()

  useEffect(() => {
    let getShoes = localStorage.getItem('watched')
    getShoes = JSON.parse(getShoes)
    getShoes.push(findShoes.id)
    getShoes = new Set(getShoes)
    getShoes = Array.from(getShoes)
    localStorage.setItem('watched', JSON.stringify(getShoes))
  }, [])

  // let findShoes = props.shoes.find(x => x.id === id);
   //[현재 방식]
   useEffect(()=> {
    let timer = setTimeout(()=> {setAlert1(false)},2000);
    return () => {
      //useEffect 동작 전에 실행됨
      clearTimeout(timer);
    }
  }, [])

    useEffect(() => {
      if (isNaN(num) === true) {
        alert("숫자를 입력해주세요");
      }
    },[num])

    useEffect(() => {
      setDetailFade('end')
      return () => {
        setDetailFade('')
      }
    },[])

    return (
        <div className={"container start " + detailFade}>
          {alert1==true ? <div className="alert alert-warning">
            2초 이내 구매시 할인
          </div> : null}
          {count}
          <button onClick={() => {setCount(count+1)}}>버튼</button>
  <div className="row">
    <div className="col-md-6">
      <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
    </div>
    <div>
      <input type = "text" onChange={(e) => {
        setNum(e.target.value)
      }}></input>
    </div>
    <div className="col-md-6">
      <h4 className="pt-5">{findShoes.title}</h4>
      <p>{findShoes.content}</p>
      <p>{findShoes.price}</p>
      <button className="btn btn-danger" onClick={()=> {
        dispatch(addItem( {id : findShoes.id, name : findShoes.title, count : 1} ))
      }}>주문하기</button> 
    </div>
  </div>

  <Nav variant="tabs" defaultActiveKey="link0">
      <Nav.Item>
        <Nav.Link onClick={() => ( setTab(0))} eventKey="link0">버튼0</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => ( setTab(1))} eventKey="link1">버튼1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => ( setTab(2))} eventKey="link2">버튼2</Nav.Link>
      </Nav.Item>
    </Nav>
    <TabContent tab={tab} shoes={props.shoes}/>
</div> 
    )
}

function TabContent({tab, shoes}) {

  let [fade, setFade] = useState('')

 useEffect(() => {
  setTimeout(() => {setFade('end')},100)
  return () => {
    setFade('')
  }
 },[tab])

  // if (props.tab == 0) {
  //   return <div>내용0</div>
  // }
  // if(props.tab==1) {
  //   return <div>내용1</div>
  // }
  // if(props.tab==2) {
  //   return <div>내용2</div>
  // }
  return (<div className={`start ${fade}`}>
    { [<div>{shoes[0].title}내용0</div>,<div>내용1</div>,<div>내용2</div>][tab] }
  </div>)
}


export default Detail;
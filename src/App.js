import { lazy, Suspense,useEffect, useState } from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import './App.css';
import data from './data'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios';
// import Detail from './routes/Detail';
// import Cart from './routes/Cart';
import { useQuery } from 'react-query';
const Detail = lazy(() => import('./routes/Detail'));
const Cart = lazy(() => import('./routes/Cart'));


function App() {

  useEffect(() => {
    localStorage.setItem('watched',JSON.stringify([]))
  },[])


  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let click = 1;

  let result = useQuery('작명', () => 
     axios.get('https://codingapple1.github.io/userdata.json').then
    ((a) => {
      console.log('요청됨')
    return a.data
  })
  )


  return (
    <div className="App">
    

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart')}}>cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            { result.isLoading && '로딩중' }
            { result.error && '에러남' }
            { result.data && result.data.name }
          </Nav>
        </Container>
      </Navbar>
  
        <Suspense fallback={<div>로딩중 입니다.</div>}>
        <Routes>
          <Route path = "/" element={
          <>
            <div className='main-bg'></div>
            <Container>
            <Row md={3}>
                {
                  shoes.map(function(a,i) {
                    return (
                      <Card shoes={shoes[i]} i={i} key={i}/>
                    )
                  })
                }     
            </Row>
            </Container>
            <button onClick={() => {
              if(click === 1 || click === 2) {
              axios.get(`https://codingapple1.github.io/shop/data${click+1}.json`)
              .then((result) =>{ let copy = [...shoes, ...result.data];
              setShoes(copy);
            })
              .catch(() => {
                console.log("실패");
              })
              }
                else {
                  alert(" 상품이 더 이상 없습니다.");
                }
            }}>더보기</button>
          </>} />


          <Route path = "/detail/:id" element={<Detail shoes={shoes} />} />
          <Route path = "/cart" element={<Cart />} />

          <Route path='*' element={<div>없는 페이지</div>} />

          <Route path='/about' element={<About />}>
            <Route path='member' element={<div>멤버</div>} />
            <Route path='location' element={<div>위치</div>} />
          </Route>

          <Route path='/event' element={<Event />}>
            <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
          </Route>
        </Routes>
        </Suspense>

    </div>
  );
}

function Card(props) {
  return (
    <Col sm>
      <img src = {"https://codingapple1.github.io/shop/shoes"+(props.i+1)+".jpg"} width="80%" />
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.price}</p>
    </Col>
  )
}


function About() {
  return (
    <div>
      <h4>회사 정보</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return (
    <div>
    <h4>오늘의 이벤트</h4>
    <Outlet></Outlet>
    </div>
  )
}


export default App;

import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, plusCount } from '../store';
import { changeAge } from '../store/userSlice';



function Cart() {

    let state = useSelector((state)=>  state) //Redux store 가져와줌
    let dispatch = useDispatch() // store.js로 요청보내주는 함수

    return (
        <div>

            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
            <button onClick={() => {
                dispatch(changeAge(1))
            }}>버튼</button>

            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>수량 추기</th>
                    <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map(function(a,i) {
                            return (
                                <tr key={i}>
                                <td>{state.cart[i].id}</td>
                                <td>{state.cart[i].name}</td>
                                <td>{state.cart[i].count}</td>
                                <td>
                                    <button onClick={() => {
                                        dispatch(plusCount(state.cart[i].id))
                                    }}>+</button>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        dispatch(deleteItem(state.cart[i].id))
                                    }}>삭제</button>
                                </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table> 
        </div>
    )
}


export default Cart;
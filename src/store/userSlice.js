import { createSlice } from "@reduxjs/toolkit"

let user = createSlice({  //useState랑 유사
    name : 'user',
    initialState : {name : 'park', age : 20},
    reducers : {
      changeName(state) {
        state.name = 'kim'
        // return {name : 'kim', age : 20}
      },
      changeAge(state, action) {
        state.age += action.payload
      }
    }
})

export let { changeName,changeAge } = user.actions //오른쪽 자료를 변수로 빼는 문법

export default user
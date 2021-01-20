import { createSlice, createSelector, getSelectors } from '@reduxjs/toolkit'

import data from '../data/data'

const ItemsSlice = createSlice({
  name: 'items',
  initialState: {
    itemsData: data,
    AdminCode: '7788',
  },
  reducers: {
    itemAdded(state, action) {
      state.itemsData.push(action.payload)
    },
    itemDeleted(state, action){
      state.itemsData.pop(action.payload)
    }
  }
})

export const { itemAdded, itemDeleted, itemSlected } = ItemsSlice.actions

export const AdminCode = state => state.items.AdminCode
export const itemsData = state => state.items.itemsData

export default ItemsSlice.reducer

/*export const ItemSelected = createSelector(
  [getSelectors((state) => state.items.itemsData), (state, selectedDate) => selectedDate],
  (items, selectedDate) => items.filter((item) => item.date === selectedDate)
)*/

/*,
    itemSlected(state, action){
      items = state.itemsData.filter((item) => item.date == action.payload)
    }*/
//use this in component:
//const post = useSelector((state) => selectPostById(state, postId))
//then extract sub-items from it

import { configureStore } from '@reduxjs/toolkit'
import ItemsReducer from '../components/ItemsSlice'

export default configureStore({
    reducer: {
      items: ItemsReducer
    },
  })
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DateTimePickerModal from "react-native-modal-datetime-picker";

import store from './store/store'
import { Provider } from 'react-redux'
import { itemAdded, itemDeleted, itemSelected } from './components/ItemsSlice'

function HomeScreen({ navigation }) {

  const [title, setItemTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [desc, setDesc] = useState('');
  const titledel = (e) => setItemTitle(e.target.value)
  const datedel = (e) => setDate(e.target.value)
  const descdel = (e) => setDesc(e.target.value)
  const dispatch = useDispatch()

  const onDeleteItemClicked = () => {
    dispatch(itemDeleted({ titledel, descdel }))
    navigation.navigate('Home')
  }

  //const items = useSelector(state => state.items.itemsData)
  const items = useSelector(state => state.items.itemsData.filter(x => x.date == date))
  const content = items.map(item => (
    <ScrollView contentContainerStyle={{ alignItems: 'stretch', justifyContent: 'flex-start' }}>
      <TouchableOpacity style={styles.itemBox} onPress={onDeleteItemClicked}>
        <View style={styles.boxstyle}>
          <Text style={styles.timestyle}>{item.date}</Text>
        </View>
        <View style={styles.boxstyle}>
          <View style={styles.titlebox, { backgroundColor: item.color }}>
            <Text style={styles.titlestyle}>{item.title}</Text>
          </View>
        </View>
        <View style={styles.boxstyle}>
          <Text style={styles.descstyle} ellipsizeMode='clip'>{item.desc}</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  ))

  return (
    <View style={{ alignItems: 'stretch', justifyContent: 'flex-start' }}>
      <Button color="#17cd17"
        title="Add New Item!"
        onPress={() => navigation.navigate('AddNewItem')}
      />
      <ScrollView contentContainerStyle={{ alignItems: 'stretch', justifyContent: 'flex-start' }}>
        {content}
      </ScrollView>
    </View>
  )
}

function AddItemScreen({ navigation }) {

  const [title, setItemTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [desc, setDesc] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const onItemTitleChanged = (e) => setItemTitle(e.target.value)
  const onDescChanged = (e) => setDesc(e.target.value)

  const dispatch = useDispatch()

  const canSave = [title, date, desc].every(Boolean)
  const onSaveItemClicked = () => {
    if (canSave) {
      const rndColorsItems = ['#913cb7', '#b73c3c', '#5d3cb7', '#3c8cb7', '#3cb746', '#acb73c', '#c3892a']
      const color = rndColorsItems[Math.floor((Math.random() * 6) + 1)]
      dispatch(itemAdded({ date, title, desc, color }))
      setItemTitle('')
      setDate()
      setDesc('')
      navigation.navigate('Home')
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({   //to change header btn to manipulate the component on the screen
      headerRight: () => (
        <TouchableOpacity>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date)
    hideDatePicker();
  };

  return (
    <View style={{ alignItems: 'stretch', justifyContent: 'center' }}>
      <View style={{ padding: 7 }}>
        <View style={{ padding: 7 }}>
          <Button
            onPress={showDatePicker}
            title="Pick a Date/Time"
          />
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View style={{ padding: 7 }}>
        <TextInput
          style={styles.textInputs}
          placeholder="Item's Title"
          value={title}
          onChange={onItemTitleChanged}
        />
      </View>
      <View style={{ padding: 7 }}>
        <TextInput
          style={styles.textInputs}
          placeholder="Description"
          value={desc}
          onChange={onDescChanged}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: 'stretch', justifyContent: 'center' }}>
        <View style={{ padding: 7 }}>
          <Button
            title="Add ITEM"
            onPress={onSaveItemClicked}
          />
        </View>
        <View style={{ padding: 7 }}>
          <Button
            onPress={() => navigation.goBack()}
            title="Cancel"
          />
        </View>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{    //or use "Options" (commented section below) in each Stack.Screen
            headerStyle: {
              backgroundColor: '#dbdbdb',
            },
            headerTintColor: '#181818',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="AddNewItem"
            component={AddItemScreen}
            options={{ title: 'Add New Item' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  timestyle: {
    fontSize: 15,
    color: '#717171'
  },
  titlebox: {
    padding: 7,
    borderRadius: 5
  },
  titlestyle: {
    fontSize: 20,
    fontWeight: 650,
    padding: 10,
    color: 'white'
  },
  descstyle: {
    fontSize: 15,
    color: '#3a3a3a',
  },
  itemBox: {
    flex: 1,
    padding: 20,
    borderColor: '#dadada',
    borderWidth: 2
  },
  boxstyle: {
    padding: 5
  },
  menuItemList: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#9e9e9e'
  },
  textInputs: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#9e9e9e'
  },
  date: {
    padding: 20
  },
  container: {
    flex: 1,
    flexGrow: 1,
    padding: 20
  }
});

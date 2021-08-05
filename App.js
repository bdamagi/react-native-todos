import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { useNavigation } from '@react-navigation/native'


function Homescreen() {
  const [toDoList, setToDoList] = useState([])

  console.log('To Do List Updated: ', toDoList)

  const navigation = useNavigation()

  const handleAddToDo = (value) => {
    console.log('Adding new to-do: ', value)

    setToDoList(list => ([
      ...list,
      value
    ]))
  }

  const handleRemoveToDo = (idx) => {
    setToDoList(list => {
      const arr = [...list]
      arr.splice(idx, 1)

      return arr
    })
  }

  return (
      <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.headline}>
            To-Do List
          </Text>

          <View style={styles.toDoContainer}>
          { /* Render each to-do here */ }
          {toDoList.map((todo, idx) => (
            <View style={styles.toDoItem} key={todo}>
              <Text style={styles.toDoText}>
                {todo}
              </Text>
              <TouchableOpacity
                style={[styles.button, styles.doneButton]}
                onPress={() => handleRemoveToDo(idx)}>

                  <Text style={styles.doneButtonText}>
                    Mark as Done
                  </Text>
                </TouchableOpacity>
          </View>
         ))}

         {!toDoList.length && (
           <View style={styles.noContent}>
             <Text style={styles.noContentText}>
               Nothing is left. Hide your family. 
             </Text>
          </View>
         )}


      </View> 
      </ScrollView>

      <TouchableOpacity 
          style={[styles.button, styles.addButton]}
          onPress={() => navigation.push('AddToDo', {
            handleAddToDo
          })}
      >
          <Text style={styles.buttonText}>
            Add a To-Do
          </Text>

      </TouchableOpacity>

      </View>
  )

}

function AddToDoScreen({ route }) {
  const { params } = route 
  const { handleAddToDo } = params 

  const [value, setValue] = useState('')

  const navigation = useNavigation()

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headline}>
          Add To-Do
        </Text>

        <TextInput
            placeholder="Enter to-do here..."
            style={styles.input}
            onChangeText={text => setValue(text)}
            value={value}
        />
        
          <TouchableOpacity
                onPress={() => {
                handleAddToDo(value)
                navigation.goBack() 
            }}

            style={[styles.button, styles.addbutton]}
          >
              <Text style={styles.buttonText}>
                Add To-Do
              </Text>

          </TouchableOpacity>

      </ScrollView>
    </View>
  )
}

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>

        <Stack.Screen 
          name='Home' 
          component={Homescreen} />
        
        <Stack.Screen
          name='AddToDo'
          component={AddToDoScreen}
          options={{
            title: 'Add To-Do'
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    width: "100%",
    padding: 30,
    alignItems: "stretch"

  },

  headline: {
    fontSize: 30,
    marginBottom: 15
  },
  toDoContainer: {
    flexDirection: "column",
    flex: 1
  },
  toDoItem: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    backgroundColor: "white",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 15,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  toDoText: {
    marginRight: 15
  },
  doneButton: {
    marginLeft: "auto",
    margin: 0,
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  doneButtonText: {
    color: "white"
  },
  toDoText: {
    fontSize: 16
  },
  noContent: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  noContentText: {
    opacity: 0.5,
    alignSelf: "center",
    textAlign: "center"
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: "#bebebe",
    borderRadius: 30,
    borderWidth: 1,
    width: "100%"
  },
  button: {
    backgroundColor: "#7e7e7e",
    alignSelf: "center",
  },
  addButton: {
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#7cc767",
    margin: 30
  },
  buttonText: {
    color: "white",
    fontSize: 20
  }

})
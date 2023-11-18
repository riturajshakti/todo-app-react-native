import { StatusBar } from 'expo-status-bar'
import { useCallback, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function App() {
	const [todo, setTodo] = useState('')
	const input = useRef()
	const [todos, setTodos] = useState([
		{
			id: 'abc',
			todo: 'hi there',
			done: true,
		},
	])

	const addTodo = useCallback(() => {
		const data = {
			id: Math.random() + '-' + Date.now(),
			todo,
			done: false,
		}

		setTodos([...todos, data])
		setTodo('')
		input.current.blur()
	})

	const deleteTodo = useCallback((todo) => {
		const list = todos.filter((e) => e.id !== todo.id)
		setTodos([...list])
		setTodo('')
	})

	const toggleTodoDone = useCallback((todo) => {
		todo.done = !todo.done
		setTodos([...todos])
	})

	return (
		<View style={styles.container}>
			<StatusBar style='auto' />

			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<TextInput
					style={styles.input}
					placeholder='Enter todo'
					value={todo}
					onChangeText={(v) => setTodo(v)}
					ref={input}
				/>
				<TouchableOpacity disabled={!todo} style={styles.buttonContainer} onPress={addTodo}>
					<Text style={styles.buttonText}>ADD TODO</Text>
				</TouchableOpacity>
			</View>

			<ScrollView style={{ flexDirection: 'column', width: '100%', marginVertical: 10 }}>
				{!todos.length && (
					<Text style={{ fontSize: 20, color: 'grey', marginTop: 30, textAlign: 'center' }}>No todos!</Text>
				)}

				{todos.map((e) => (
					<TouchableOpacity key={e.id} style={styles.todoContainer} onPress={() => toggleTodoDone(e)}>
						<Text
							style={{
								fontSize: 30,
                maxWidth: 200,
								color: e.done ? 'grey' : 'black',
								textDecorationLine: e.done ? 'line-through' : 'none',
							}}
						>
							{e.todo}
						</Text>
						<TouchableOpacity onPress={() => deleteTodo(e)} style={styles.deleteButtonContainer}>
							<Text>❌</Text>
						</TouchableOpacity>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		width: '80%',
		borderColor: 'gray',
		borderWidth: 1,
		marginEnd: 10,
		paddingHorizontal: 10,
	},
	container: {
		padding: 20,
		paddingTop: 70,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainer: {
		padding: 10,
		backgroundColor: 'blue',
		borderRadius: 5,
	},
	deleteButtonContainer: {
		padding: 10,
		width: 38,
		height: 38,
		backgroundColor: 'white',
		borderRadius: 80,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
	},
	todoContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',
		paddingVertical: 30,
		paddingHorizontal: 20,
		borderRadius: 30,
		marginTop: 20,
		backgroundColor: 'rgb(232, 232, 232)',
	},
})

import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Container, ToDoList, Input, Button, ListItem, Trash, Check } from './styles.js'

function App() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState('');

  function inputChange(event) {
    setTask(event.target.value)
  }
  function save() {
    if(task){
    setList([...list, { id: uuid(), task, finished: false }])
    }
  }
  function finishedTask(id) {
    const newList = list.map(item => (
      item.id === id ? { ...item, finished: !item.finished } : item
    ))
    setList(newList)
  }
  function deletTask(id) {
    const newList = list.filter(item => item.id !== id)
    setList(newList)
  }
  return (
    <Container>
      <ToDoList>
        <Input onChange={inputChange} placeholder="O que tenho pra fazer..."></Input>
        <Button onClick={save}>Adicionar</Button>
        <ul>
          {
            list.length > 0 ? (
              list.map(item => (
                <ListItem isFinished={item.finished} key={item.id}>
                  <Check onClick={() => finishedTask(item.id)} />
                  <li>{item.task}</li>
                  <Trash onClick={() => deletTask(item.id)} />
                </ListItem>
              ))
            ) : (<h3>Não há tarefas</h3>)
          }

        </ul>
      </ToDoList>
    </Container>

  )
}

export default App

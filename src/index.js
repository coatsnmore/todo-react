import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
console.clear();

const Title = ({ todoCount }) => {
  return (
    <div>
      <div>
        <h1>to-do ({todoCount})</h1>
      </div>
    </div>
  );
}

const TodoForm = ({ addTodo }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        addTodo(input.value);
        input.value = '';
      }}>
        +
      </button>
    </div>
  );
};

const Todo = ({ todo, remove }) => {
  // Each Todo
  // return (<a href="#" className="list-group-item" onClick={() => { remove(todo.id) }}>{todo.text}</a>);
  return (<div className="todo">{todo.text}<button onClick={() => { remove(todo.id) }}> - </button></div>);
}

const TodoList = ({ todos, remove }) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove} />)
  });
  return (<div className="list-group" style={{ marginTop: '30px' }}>{todoNode}</div>);
}

// Contaner Component
// Todo Id
window.id = 0;
class TodoApp extends React.Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    }
  }

  // on start
  componentDidMount() {
    // Make HTTP reques with Axios
    // axios.get(this.apiUrl)
    //   .then((res) => {
    //     // Set state with result
    //     this.setState({ data: res.data });
    //   });
  }

  addTodo(val) {
    const todo = { text: val, id: window.id++ };
    this.state.data.push(todo);
    this.setState({ data: this.state.data });
  }

  handleRemove(id) {
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if (todo.id !== id) return todo;
    });
    // Update state with filter
    this.setState({ data: remainder });
  }

  render() {
    // Render JSX
    return (
      <div>
        <Title todoCount={this.state.data.length} />
        <TodoForm addTodo={this.addTodo.bind(this)} />
        <TodoList
          todos={this.state.data}
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}
ReactDOM.render(<TodoApp />, document.getElementById('root'));
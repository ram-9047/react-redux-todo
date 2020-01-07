import React from "react";
import { connect } from "react-redux";

class App extends React.Component {
  constructor(props) {
    // super is used to take all the propertise from react.component
    super(props);

    this.state = {
      newItem: "",
      editingId: null,
      editingValue: null
    };
  }

  updateInput(key, value) {
    //update react state
    this.setState({
      [key]: value
    });
  }

  addItem() {
    this.props.dispatch({ type: "ADD_TODO", payload: this.state.newItem });
    this.setState({
      newItem: ""
    });
  }

  editItem(id) {
    this.setState({
      editingId: id,
      editingValue: this.props.list.find(todo => todo.id === id).value
    });
  }

  handleChange(e) {
    this.setState({
      editingValue: e.target.value
    });
  }

  saveEditingValue(e) {
    e.preventDefault();
    this.props.dispatch({
      type: "EDIT_TODO",
      payload: {
        id: this.state.editingId,
        value: this.state.editingValue
      }
    });
    this.setState({
      editingId: null
    });
  }

  deleteItem(id) {
    this.props.dispatch({ type: "DELETE_TODO", payload: id });
  }

  render() {
    return (
      <div className="App">
        <center>
          <span>Add an item...</span>
          <br />
          <input
            type="text"
            placeholder="type item here...."
            value={this.state.newItem}
            onChange={elem => this.updateInput("newItem", elem.target.value)}
          />
          <button onClick={() => this.addItem()}> Add</button>
          <ul>
            {this.props.list.map(item => {
              return (
                <li key={item.id}>
                  {this.state.editingId === item.id ? (
                    <form onSubmit={e => this.saveEditingValue(e)}>
                      <input
                        type="text"
                        value={this.state.editingValue}
                        onChange={e => this.handleChange(e)}
                      ></input>
                    </form>
                  ) : (
                    <p>{item.value}</p>
                  )}
                  <button onClick={() => this.editItem(item.id)}>Edit</button>
                  <button onClick={() => this.deleteItem(item.id)}>X</button>
                </li>
              );
            })}
          </ul>
        </center>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { list: state };
};

export default connect(mapStateToProps)(App);

import React from 'react';
import ReactDOM from 'react-dom/client';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateIsEdit = this.updateIsEdit.bind(this);
  }

  handleChange(e) {
    this.setState({
      name:e.target.value
    })
  }
  updateIsEdit(e, value="null") {
    this.setState({
        isEdit: value
    });
  }

  render() {
    return (
      <div>
        <input type="text" name="userName" value={this.state.name} placeholder="Enter your name..." onChange={this.handleChange} onBlur={this.updateIsEdit}/>
        <img src="https://img.icons8.com/android/24/000000/edit.png" className="edit" />
        <p id="name">{this.state.name}</p>
      </div>

    );
  }
}

ReactDOM.render(<Info />, document.getElementById('root'));
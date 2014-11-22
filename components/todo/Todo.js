var Todo = React.createClass({displayName: 'Todo',
  handleSubmit: function(task){
    var today = new Date();

    this.state.data.unshift({
      label: task,
      done: false,
      ts: today.getTime()
    });

    localStorage.setItem('todoItems', JSON.stringify(this.state.data));

    this.setState({data: this.state.data});
  },
  clearDone: function(){
    var undone =_.reject(this.state.data, function(task){
      return task.done == true;
    });
    localStorage.setItem('todoItems', JSON.stringify(undone));
    this.setState({data: undone});
  },
  updateTask: function(task){
    this.state.data.map(function(item){
      if(item.ts == task.ts) {
        task.done = task.done == false;
        if(task.done) {
          var today = new Date();
          task.doneDate = today.getDate() + "." + today.getMonth() + "." + today.getFullYear();
        } else {
          task.doneDate = null;
        }
      }
    });

    localStorage.setItem('todoItems', JSON.stringify(this.state.data));

    this.setState({
      data: this.state.data
    });
  },
  getInitialState: function() {
    var data = JSON.parse(localStorage.getItem('todoItems')) || [];
    return { data: data };
  },
  render: function() {
    return (
      <div className='todoApp shadow'>
        <TodoInput submit={this.handleSubmit} />
        <TodoList data={this.state.data} updateTask={this.updateTask}/>
        <TodoClear clearDone={this.clearDone} data={this.state.data} />
      </div>
    );
  }
});

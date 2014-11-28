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

  changeTaskState: function(task){
    this.state.data.map(function(item){
      if(item.ts === task.ts) {
        task.done = task.done == false;
        task.doneDate = null;

        if(task.done) {
          var today = new Date();
          task.doneDate = today.getDate() + "." + today.getMonth() + "." + today.getFullYear();
        }
      }
    });

    localStorage.setItem('todoItems', JSON.stringify(this.state.data));

    this.setState({
      data: this.state.data
    });
  },

  getInitialState: function() {
    jevents.addEventListener('TASK_ADDED', this.handleSubmit);
    jevents.addEventListener('TASK_CHANGE_STATE', this.changeTaskState);
    jevents.addEventListener('CLEAR_DONE_TASKS', this.clearDone);

    var data = JSON.parse(localStorage.getItem('todoItems')) || [];
    return { data: data };
  },

  render: function() {
    var doneCount = _.reject(this.state.data, function(task){ return task.done == false; }).length;

    return (
      <div className='todoApp shadow'>
        <TodoInput />
        <TodoList data={this.state.data} />
        <TodoClear doneCount={doneCount} />
      </div>
    );
  }

});

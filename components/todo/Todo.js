var Todo = React.createClass({displayName: 'Todo',

  addTask: function(task){
    this.state.data.unshift({
      label: task,
      done: false,
      ts: new Date().getTime()
    });

    this.saveState(this.state.data);
  },

  saveState: function(data){
      localStorage.setItem('todoItems', JSON.stringify(data));
      this.setState({data: data});
  },

  clearDone: function(){
    var undone =_.reject(this.state.data, function(task){
      return task.done == true;
    });
    this.saveState(undone);
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
    jevents.addEventListener('ADD_TASK', this.addTask);
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

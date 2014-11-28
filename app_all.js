var TodoList = React.createClass({displayName: 'TodoList',

  render: function() {
    var self = this;
    var items = _.filter(this.props.data, function (task) { return task.done == false; });
    var done = _.filter(this.props.data, function (task) { return task.done == true; });

    items = items.map(function (task) {
        return (
          React.createElement(TodoItem, {
            task: task, 
            className: task.done === true ? 'done' : 'undone', 
            key: task.ts})
        );
    });

    var donelist;
    if(done.length > 0) {
      done = done.map(function (task) {
          return (
            React.createElement(TodoItem, {
              task: task, 
              className: task.done === true ? 'done' : 'undone', 
              key: task.ts})
          );
      });

      donelist = React.createElement("ul", {className: "itemList doneones"}, 
        done
      );
    }

    return (
      React.createElement("div", {className: "shadow"}, 
        React.createElement("ul", {className: "itemList"}, 
          items
        ), 
        donelist
      )
    );
  }

});

var TodoItem = React.createClass({displayName: 'TodoItem',

  changeState: function() {
    jevents.dispatchEvent('TASK_CHANGE_STATE', this.props.task);
  },

  render: function(){
    var task = this.props.task;
    var doneDate;

    if(task.doneDate) {
      doneDate = React.createElement("span", {className: "date"}, 
        "(", moment(new Date(task.doneDate)).fromNow(), ")"
      )
    }

    return(
      React.createElement("li", {className: task.done == true ? 'done clearfix' : 'undone clearfix', onClick: this.changeState}, 
        React.createElement("span", {className: "checkbox"}), 
        React.createElement("span", {className: "label"}, task.label), 
        doneDate
      )
    );
  }

});

var TodoInput = React.createClass({displayName: 'TodoInput',

  handleSubmit: function(e) {
    e.preventDefault();
    var task = this.refs.task.getDOMNode().value.trim();
    jevents.dispatchEvent('ADD_TASK', task);
    this.refs.task.getDOMNode().value = '';
  },

  componentDidMount: function(){
    this.refs.task.getDOMNode().focus();
  },

  render: function() {
    return (
      React.createElement("form", {onSubmit: this.handleSubmit, className: "todoInputForm clearfix shadow"}, 
        React.createElement("input", {type: "text", placeholder: "Todo...", ref: "task"}), 
        React.createElement("button", null, "✚")
      )
    );
  }

});

var TodoClear = React.createClass({displayName: 'TodoClear',

  handleClick: function(){
    jevents.dispatchEvent('CLEAR_DONE_TASKS');
  },

  render: function(){
    var doneCount = this.props.doneCount;
    var hideBtn = doneCount < 1;

    return (
      React.createElement("div", {className: hideBtn === true ? 'hide' : ''}, 
        React.createElement("button", {onClick: this.handleClick}, "Poista valmiit (", doneCount, ")")
      )
      )
  }

});

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
          task.doneDate = today.getTime();
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
      React.createElement("div", {className: "todoApp shadow"}, 
        React.createElement(TodoInput, null), 
        React.createElement(TodoList, {data: this.state.data}), 
        React.createElement(TodoClear, {doneCount: doneCount})
      )
    );
  }

});

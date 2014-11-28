var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TodoList = React.createClass({displayName: 'TodoList',

  render: function() {
    var self = this;
    var items = _.filter(this.props.data, function (task) { return task.done == false; });
    var done = _.filter(this.props.data, function (task) { return task.done == true; });

    items = items.map(function (task) {
        return (
          React.createElement(TodoItem, {task: task, className: task.done === true ? 'done' : 'undone', key: task.ts, update: self.updateItems})
        );
    });

    var donelist;
    if(done.length > 0) {
      done = done.map(function (task) {
          return (
            React.createElement(TodoItem, {task: task, className: task.done === true ? 'done' : 'undone', key: task.ts})
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
        "(", task.doneDate, ")"
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
    jevents.dispatchEvent('TASK_ADDED', task);
    this.refs.task.getDOMNode().value = '';
    return;
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
        var doneCount = _.reject(this.props.data, function(task){
            return task.done == false;
        }).length;

        var hideBtn = doneCount < 1;

        return (
            React.createElement("div", {className: hideBtn === true ? 'hide' : ''}, 
                React.createElement("button", {onClick: this.handleClick}, "Poista valmiit (", doneCount, ")")
            )
        )
    }

});

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
      if(item.ts === task.ts) {
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
    var self = this;

    jevents.addEventListener('TASK_ADDED', function(task){
      self.handleSubmit(task);
    });

    jevents.addEventListener('TASK_CHANGE_STATE', function(task){
      self.updateTask(task);
    });

    jevents.addEventListener('CLEAR_DONE_TASKS', function(){
      self.clearDone();
    });

    return (
      React.createElement("div", {className: "todoApp shadow"}, 
        React.createElement(TodoInput, {submit: this.handleSubmit}), 
        React.createElement(TodoList, {data: this.state.data}), 
        React.createElement(TodoClear, {data: this.state.data})
      )
    );
  }

});

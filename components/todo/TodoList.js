var TodoList = React.createClass({
  updateItems: function(task) {
    this.props.updateTask(task);
  },
  render: function() {
    var self = this;
    var items = _.filter(this.props.data, function (task) { return task.done == false; });
    var done = _.filter(this.props.data, function (task) { return task.done == true; });

    items = items.map(function (task) {
        return (
          <TodoItem task={task} className={task.done === true ? 'done' : 'undone'} key={task.ts} update={self.updateItems}/>
        );
    });

    done = done.map(function (task) {
        return (
          <TodoItem task={task} className={task.done === true ? 'done' : 'undone'} key={task.ts} update={self.updateItems}/>
        );
    });

    return (
      <div className="shadow">
        <ul className='itemList'>
          {items}
        </ul>
        <ul className='itemList doneones'>
          {done}
        </ul>
      </div>
    );
  }
});

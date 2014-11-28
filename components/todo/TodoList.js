var TodoList = React.createClass({

  render: function() {
    var self = this;
    var items = _.filter(this.props.data, function (task) { return task.done == false; });
    var done = _.filter(this.props.data, function (task) { return task.done == true; });

    items = items.map(function (task) {
        return (
          <TodoItem
            task={task}
            className={task.done === true ? 'done' : 'undone'}
            key={task.ts}/>
        );
    });

    var donelist;
    if(done.length > 0) {
      done = done.map(function (task) {
          return (
            <TodoItem
              task={task}
              className={task.done === true ? 'done' : 'undone'}
              key={task.ts} />
          );
      });

      donelist = <ul className='itemList doneones'>
        {done}
      </ul>;
    }

    return (
      <div className="shadow">
        <ul className='itemList'>
          {items}
        </ul>
        {donelist}
      </div>
    );
  }

});

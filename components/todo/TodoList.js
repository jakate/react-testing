var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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

    var donelist;
    if(done.length > 0) {
      done = done.map(function (task) {
          return (
            <TodoItem task={task} className={task.done === true ? 'done' : 'undone'} key={task.ts} update={self.updateItems}/>
          );
      });

      donelist = <ul className='itemList doneones'>
        {done}
      </ul>;
    }

    return (
      <div className="shadow">
        <ul className='itemList'>
          <ReactCSSTransitionGroup transitionName="example" transitionLeave={false}>
            {items}
          </ReactCSSTransitionGroup>
        </ul>
        {donelist}
      </div>
    );
  }
});

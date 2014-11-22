var TodoItem = React.createClass({
  changeState: function() {
    this.props.update(this.props.task);
  },
  render: function(){
    var task = this.props.task;
    return(
      <li className={task.done == true ? 'done' : 'undone'} >
        <label className="clearfix">
          <input type='checkbox' checked={task.done} onChange={this.changeState}/>
            <span className="label">
              {task.label}
            </span>
            <span className={task.doneDate == undefined ? 'date disabled' : 'date'}>
              ({task.doneDate})
            </span>
        </label>
      </li>
    );
  }
});

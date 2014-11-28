var TodoItem = React.createClass({

  changeState: function() {
    jevents.dispatchEvent('TASK_CHANGE_STATE', this.props.task);
  },

  render: function(){
    var task = this.props.task;
    var doneDate;

    if(task.doneDate) {
      doneDate = <span className="date">
        ({moment(new Date(task.doneDate)).fromNow()})
      </span>
    }

    return(
      <li className={task.done == true ? 'done clearfix' : 'undone clearfix'} onClick={this.changeState}>
        <span className="checkbox"></span>
        <span className="label">{task.label}</span>
        {doneDate}
      </li>
    );
  }

});

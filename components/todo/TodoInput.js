var TodoInput = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var task = this.refs.task.getDOMNode().value.trim();
    this.props.submit(task);
    this.refs.task.getDOMNode().value = '';
    return;
  },
  componentDidMount: function(){
    this.refs.task.getDOMNode().focus();
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit} className='todoInputForm clearfix shadow'>
        <input type='text' placeholder='Todo...' ref='task' />
        <button>✚</button>
      </form>
    );
  }
});

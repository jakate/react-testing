var TodoInput = React.createClass({

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
      <form onSubmit={this.handleSubmit} className='todoInputForm clearfix shadow'>
        <input type='text' placeholder='Todo...' ref='task' />
        <button>✚</button>
      </form>
    );
  }

});

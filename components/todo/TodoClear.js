var TodoClear = React.createClass({

  handleClick: function(){
    jevents.dispatchEvent('CLEAR_DONE_TASKS');
  },

  render: function(){
    var doneCount = this.props.doneCount;
    var hideBtn = doneCount < 1;

    return (
      <div className={hideBtn === true ? 'hide' : ''}>
        <button onClick={this.handleClick}>Clear done ({doneCount})</button>
      </div>
      )
  }

});

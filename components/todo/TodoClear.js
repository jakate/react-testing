var TodoClear = React.createClass({

    handleClick: function(){
        jevents.dispatchEvent('CLEAR_DONE_TASKS');
    },

    render: function(){
        var doneCount = _.reject(this.props.data, function(task){
            return task.done == false;
        }).length;

        var hideBtn = doneCount < 1;

        return (
            <div className={hideBtn === true ? 'hide' : ''}>
                <button onClick={this.handleClick}>Poista valmiit ({doneCount})</button>
            </div>
        )
    }

});

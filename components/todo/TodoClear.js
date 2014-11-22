var TodoClear = React.createClass({
    handleClick: function(){
        this.props.clearDone();
    },
    render: function(){
        var doneLength = _.reject(this.props.data, function(task){
            return task.done == false;
        }).length;

        var hideBtn = doneLength < 1;

        return (
            <div className={hideBtn === true ? 'hide' : ''}>
                <button onClick={this.handleClick}>Poista valmiit ({doneLength})</button>
            </div>
        )
    }
});

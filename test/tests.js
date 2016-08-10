module( 'Rekord.Sync' );

test( 'Sync props', function(assert)
{
  var prefix = 'Sync_props_';

  var Task = Rekord({
    name: prefix + 'task',
    fields: ['name', 'done']
  });

  var t0 = Task.create({name: 't0', done: false});

  var TaskItem = React.createClass({
    componentDidMount: function() {
      Rekord.Sync( this, this.props.task );
    },
    render: function() {
      var task = this.props.task;
      return (
        <li>
          <label>
            <input type="checkbox" checked={task.done} />
            <span>{task.name}</span>
          </label>
        </li>
      )
    }
  });

  var container = document.createElement('ul');

  ReactDOM.render(<TaskItem task={t0}></TaskItem>, container );

  var children = container.childNodes[0/*li*/].childNodes[0/*label*/].childNodes;

  strictEqual( children[0].checked, false );
  strictEqual( children[1].innerHTML, 't0' );

  t0.name = 't0a';
  t0.done = true;
  t0.$save();

  strictEqual( children[0].checked, true );
  strictEqual( children[1].innerHTML, 't0a' );
});


test( 'Sync state', function(assert)
{
  var prefix = 'Sync_state_';

  var Task = Rekord({
    name: prefix + 'task',
    fields: ['name', 'done']
  });

  var t0 = Task.create({name: 't0', done: false});

  var TaskItem = React.createClass({
    getInitialState: function() {
      return {task: t0};
    },
    componentDidMount: function() {
      Rekord.Sync( this, t0, 'task' );
    },
    render: function() {
      var task = this.state.task;
      return (
        <li>
          <label>
            <input type="checkbox" checked={task.done} />
            <span>{task.name}</span>
          </label>
        </li>
      )
    }
  });

  var container = document.createElement('ul');

  ReactDOM.render(<TaskItem></TaskItem>, container );

  var children = container.childNodes[0/*li*/].childNodes[0/*label*/].childNodes;

  strictEqual( children[0].checked, false );
  strictEqual( children[1].innerHTML, 't0' );

  t0.name = 't0a';
  t0.done = true;
  t0.$save();

  strictEqual( children[0].checked, true );
  strictEqual( children[1].innerHTML, 't0a' );
});

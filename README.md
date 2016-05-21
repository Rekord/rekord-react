# <img src="https://raw.githubusercontent.com/Rekord/rekord/master/images/rekord-color.png" width="60"> rekord-react

[![Build Status](https://travis-ci.org/Rekord/rekord-react.svg)](https://travis-ci.org/Rekord/rekord-react)
[![Dependency Status](https://david-dm.org/Rekord/rekord-react.svg)](https://david-dm.org/Rekord/rekord-react)
[![devDependency Status](https://david-dm.org/Rekord/rekord-react/dev-status.svg)](https://david-dm.org/Rekord/rekord-react#info=devDependencies)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Rekord/rekord/blob/master/LICENSE)
[![Alpha](https://img.shields.io/badge/State-Alpha-orange.svg)]()

A rekord binding to React - adding Rekord.Bind.

The easiest way to install is by using bower via `bower install rekord-react`.

### Rekord.Bind

Rekord.Bind will bind modifications made outside of react to a react component.
Modifications outside of react includes but is not limited to:

- Data being loaded from local storage
- Data being loaded from a REST API
- Data being returned from saving a record
- Data being broadcasted live
- Data retrieved from an automatic refresh
- A model is added/updated/removed in a separate place in the application
- A relationship is updated in a separate place in the application

```javascript
var Task = Rekord({
  name: 'task',
  fields: ['name', 'done'],
  defaults: {done: false}
});

var TaskItem = React.createClass({
  componentDidMount: function() {
    Rekord.Bind( this, this.props.task );
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

var t0 = new Task({
  name: 'New Task',
  done: false
});

ReactDOM.render(
  <TaskItem task={t0}></TaskItem>,
  document.getElementById('task')
);

t0.done = true;
t0.$save();

// #task element updated (checked)

// More binding arguments:

Rekord.Bind( component, Task ); // Listens to all tasks

var task = Task.create({name: 'Task #1'});

Rekord.Bind( component, task ); // Listens to a single task

var done = Task.all().where('done', true);

Rekord.Bind( component, done ); // Listens to collection of all done tasks

var page = done.page( 10 );

Rekord.Bind( component, page ); // Listens to a page from a collection
```

/* rekord-react 1.4.2 - A rekord binding to React - adding Rekord.Sync by Philip Diffenderfer */
// UMD (Universal Module Definition)
(function (root, factory)
{
  if (typeof define === 'function' && define.amd) // jshint ignore:line
  {
    // AMD. Register as an anonymous module.
    define(['Rekord', 'react'], function(Rekord, react) { // jshint ignore:line
      return factory(root, Rekord, react);
    });
  }
  else if (typeof module === 'object' && module.exports)  // jshint ignore:line
  {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(global, require('Rekord'), require('react'));  // jshint ignore:line
  }
  else
  {
    // Browser globals (root is window)
    root.Rekord = factory(root, root.Rekord, root.React);
  }
}(this, function(global, Rekord, React, undefined)
{

  var isRekord = Rekord.isRekord;

function Sync( component, target, property, set )
{
  if ( !(this instanceof Sync) )
  {
    return new Sync( component, target );
  }

  this.component = component;
  this.target = target;
  this.property = property;

  if ( set )
  {
    this.notify();
  }

  this.on();
}

Sync.prototype =
{
  on: function()
  {
    var target = this.target;

    if ( isRekord( target ) )
    {
      target = this.target = target.Database;
    }

    var off = this.off = target[ target.$change ? '$change' : 'change' ]( this.notify, this );

    var unmount = this.component.componentWillUnmount;

    this.component.componentWillUnmount = function()
    {
      if ( unmount )
      {
        unmount.apply( this, arguments );
      }

      off();
    };
  },
  notify: function()
  {
    if ( this.property )
    {
      var state = {};
      state[ this.property ] = this.target;

      this.component.setState( state );
    }
    else
    {
      this.component.forceUpdate();
    }
  }
};


  Rekord.Sync = Sync;

  return Rekord;

}));

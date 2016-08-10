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

var Character = {
  
  create: function () {
    var _fields = {};

    function assignAndReturnFn(field) {
      return function(passedInVar) {
        if (passedInVar !== undefined) _fields[field] = passedInVar;
        return _fields[field];
      }
    }
    
    function validAlignment (alignment) {
      var validAlignments = ['Good', 'Neutral', 'Evil'];
      return validAlignments.indexOf(alignment) > -1;
    }

    return {
      
      name: assignAndReturnFn('name'),
      
      alignment: function (alignment) {
        var assignAndReturn = assignAndReturnFn('alignment');
        if (alignment === undefined) return assignAndReturn();
        if (!validAlignment(alignment)) throw "Invalid alignment '" + alignment + "'";
        return assignAndReturn(alignment);    
      },
      
      hitPoints: function () {
        var hitPoints = assignAndReturnFn('hitPoints');
        if (hitPoints() === undefined) hitPoints(5);
        return hitPoints();
      },
      
      armorClass: function() {
        return 10;
      },
      
      attack: function (opponent, roll) {
        if(roll >= opponent.armorClass()) {
          opponent.damage();
          return true;
        }
        
        return false;
      },
      
      damage: function () {
        _fields.hitPoints--;
      }
    };
  }
};

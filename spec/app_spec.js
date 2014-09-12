describe("Evercraft", function() {
  describe("Character", function() {
    var subject, opponent;

    beforeEach(function() {
      subject = Character.create();
      opponent = Character.create();
    });
    
    it("has a name", function() {
      subject.name('Bob');
      expect(subject.name()).toBe('Bob');
    });
    
    it('has a valid alignment', function () {
      subject.alignment('Good');
      expect(subject.alignment()).toBe('Good');
      
      subject.alignment('Neutral');
      expect(subject.alignment()).toBe('Neutral');
      
      subject.alignment('Evil');
      expect(subject.alignment()).toBe('Evil');
    });
    
    it('cannot have an invalid alignment', function () {
      expect(function() {
        subject.alignment('Jaded');
      }).toThrow("Invalid alignment 'Jaded'");
    });
    
    it('has a default hit points of 5', function () {
      expect(subject.hitPoints()).toBe(5);
    });
    
    it('has a default armor class of 10', function () {
      expect(subject.armorClass()).toBe(10);
    });
    
    when('attacking', function () {
      
      and('roll beats armor class', function () {
        
        var hit;
        var expectedHitPoints;
        
        beforeEach(function () {
          spyOn(opponent, 'armorClass').and.returnValue(5);
          expectedHitPoints = opponent.hitPoints() - 1;
          hit = subject.attack(opponent, 10);
        });

        it('hits opponent', function () {
          expect(hit).toBe(true);
        });
        
        it('deals a point of damage to the opponent', function () {
          expect(opponent.hitPoints()).toBe(expectedHitPoints);
        });
        
      });
      
      and('roll meets armor class', function () {
        
        var hit;
        var expectedHitPoints;
        
        beforeEach(function () {
          spyOn(opponent, 'armorClass').and.returnValue(10);
          expectedHitPoints = opponent.hitPoints() - 1;
          hit = subject.attack(opponent, 10);
        });

        it('hits opponent', function () {
          expect(hit).toBe(true);
        });
        
        it('deals a point of damage to the opponent', function () {
          expect(opponent.hitPoints()).toBe(expectedHitPoints);
        });
        
      });
      
      and('roll does not meet or beat armor class', function () {
        
        var hit;
        var expectedHitPoints;
        
        beforeEach(function () {
          spyOn(opponent, 'armorClass').and.returnValue(15);
          expectedHitPoints = opponent.hitPoints();
          hit = subject.attack(opponent, 10);
        });

        it('hits opponent', function () {
          expect(hit).toBe(false);
        });
        
        it('deals a point of damage to the opponent', function () {
          expect(opponent.hitPoints()).toBe(expectedHitPoints);
        });
        
      });
      
    });
    
  });
});

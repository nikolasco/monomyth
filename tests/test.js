module("namespace");

test("exists", 2, function() {
         ok(Monomyth, "Monomyth exists");
         equals(typeof Monomyth, "object", "Monomyth is an object");
});

module("class");

test("one class", 7, function() {
         var Foo = Monomyth.Class.extend({
             init: function(v) {
                 this.val = v;
             },
             hi: function() {
                 return "Foo";
             }});
         equals(typeof Foo, "function", "Foo is a function");

         var f = new Foo(5);
         equals(typeof f, "object", "can construct a Foo");

         ok(f instanceof Foo, "a Foo is an instance of Foo");
         ok(f instanceof Monomyth.Class, "a Foo is an instance of Monomyth.Class");

         ok(f.hi, "a Foo has a hi method");
         equals(f.hi(), "Foo", "a Foo's hi method returns the expected value");
         equals(f.val, 5, "a Foo's val has the expected value");
});

test("'line' class relation", 19, function() {
         var Foo = Monomyth.Class.extend({
             init: function(v) {
                 this.name = "a";
                 this.val = v;
             },
             hi: function() {
                 return "Foo";
             },
             boo: function() {
                 return "ah!";
             },
             bye: function() {
                 return "bye";
             }});
         var Bar = Foo.extend({
             init: function(v) {
                 this.$super(v);
                 this.name = "z";
             },
             hi: function() {
                 return "Bar";
             },
             boo: function() {
                 return this.$super() + "bar";
             },
             toot: function() {
                 return "toot toot";
             }});
         var b = new Bar(7);

         equals(typeof Bar, "function", "Bar is a function");
         equals(typeof b, "object", "can construct a Bar");

         ok(b instanceof Bar, "a Bar is an instance of Bar");
         ok(b instanceof Foo, "a Bar is an instance of Foo");
         ok(b instanceof Monomyth.Class, "a Bar is an instance of Monomyth.Class");

         equals(b.val, 7, "a Bar's val is correct");
         equals(b.name, "z", "a Bar's name is correct");

         equals(b.toot(), "toot toot", "calling Bar method on a Bar");
         equals(b.hi(), "Bar", "calling Foo method overidden by Bar on a Bar");
         equals(b.bye(), "bye", "calling Foo method on a Bar");
         equals(b.boo(), "ah!bar", "calling Foo method overriden by Bar (using $super) on a Bar");

         var Baz = Bar.extend({
             init: function(v) {
                 this.$super(v);
                 this.who = 10;
             },
             boo: function() {
                 return this.$super() + "!woo!";
             }});

         var z = new Baz(71);

         ok(z instanceof Baz, "a Baz is an instance of Baz");
         ok(z instanceof Bar, "a Baz is an instance of Bar");
         ok(z instanceof Foo, "a Baz is an instance of Foo");
         ok(z instanceof Monomyth.Class, "a Baz is an instance of Monomyth.Class");

         equals(z.val, 71, "a Baz's val is correct");
         equals(z.who, 10, "a Baz's who is correct");
         equals(z.name, "z", "a Baz's name is correct");

         equals(z.boo(), "ah!bar!woo!", "a Foo method overriden by both Bar and Baz and both can use $super");
});

test("'fork' class relation", 10, function() {
         var Foo = Monomyth.Class.extend({
             init: function(v) {
                 this.val = v;
             },
             boo: function() {
                 return "ah!";
             }});
         var Bar = Foo.extend({
             init: function(v) {
                 this.$super(v);
                 this.name = "z";
             },
             boo: function() {
                 return this.$super() + "bar";
             }});
         var Far = Foo.extend({
             init: function(v) {
                 this.$super(v);
                 this.name = "n";
             },
             boo: function() {
                 return this.$super() + "far";
             }});
         var b = new Bar(23);
         var f = new Far(97);

         ok(b instanceof Foo, "a Bar is an instance of Foo");
         ok(f instanceof Foo, "a Far is an instance of Foo");
         ok(!(b instanceof Far), "a Bar isn't an instance of Far");
         ok(!(f instanceof Bar), "a Far isn't an instance of Bar");

         equals(b.val, 23, "a Bar's val is correct");
         equals(f.val, 97, "a Far's val is correct");

         equals(b.name, "z", "a Bar's name is correct");
         equals(f.name, "n", "a Far's name is correct");

         equals(b.boo(), "ah!bar", "a Foo method overidden by Bar can use $super");
         equals(f.boo(), "ah!far", "a Foo method overidden by Far can use $super");
});

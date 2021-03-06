// Variadic composition.
function compose() {
    fs = Array.prototype.slice.call(arguments, 0).reverse();
    return function(x) {
        fs.forEach(function(f) { x = f(x); });
        return x;
    }
}

// (Shallow) immutable merging.
function merge(x1, x2) {
    function squish(under, over) {
        for (var key in over) {
            under[key] = over[key];
        }
        return under;
    }
    return squish(squish({}, x1), x2);
}

// String -> Person
function Person(name) {
    return {_name: name};
}

// String -> 'Person'
function Dog(name) {
    return {_name: name + " the dog"};
}

// Person -> Person
function Friendly(person) {
    return merge(person,
            {hello: function() {
                return "Hi, I'm " + person._name + ".";
            }});
}

// String -> Person -> Person
function Titled(title) {
    return function(person) {
        return merge(person, {_name: title + " " + person._name});
    }
}

// Composition with the 'mixin' Friendly().
var Friend = compose(Friendly, Person);
var tony = new Friend("Tony");
console.log(tony.hello());

// Currying with Titled().
var ImportantFriend = compose(Friendly, Titled("Professor"), Person);
var susan = new ImportantFriend("Susan");
console.log(susan.hello());

// Since it's all just functions, we can easily name or not name any part.
var Doctor = Titled("Dr");
var rufus = new compose(Friendly, Doctor, Dog)("Rufus");
console.log(rufus.hello());

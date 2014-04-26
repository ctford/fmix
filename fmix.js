function compose() {
    fs = arguments;
    return function(x) {
        for(var i in fs) {
            var f = fs[fs.length - i - 1];
            x = f.apply(null, [x]);
        }
        return x;
    }
}

function merge(x1, x2) {
    function squish(under, over) {
        for (var key in over) {
            under[key] = over[key];
        }
        return under;
    }
    return squish(squish({}, x1), x2);
}

function Person(name) {
    return {_name: name};
}

function Titled(x) {
    return merge(x, {_title: "Dr"});
}

function Friendly(x) {
    return merge(x, {hello: function() { return "Hi, I'm " + x._title + " " + x._name;}});
}

var TitledPerson = compose(Titled, Person);
var Friend = compose(Friendly, Titled, Person);
var tony = new Friend("Tony");

console.log(tony);
console.log(tony.hello());

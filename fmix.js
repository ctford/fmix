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

function squish(x1, x2) {
    for (var key in x2) {
        x1[key] = x2[key];
    }
    return x1;
}

function merge(x1, x2) {
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

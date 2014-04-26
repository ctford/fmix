fmix
====

A crude proof-of-concept of a mixin-system for Javascript based on pure
functions.

Inspiration
-----------

In the final chapter of [Functional Javascript](http://functionaljavascript.com/),
[@fogus](https://twitter.com/fogus) describes a mixin system based on
Underscore's `_.extend()`. Each mixin is represented as an object, which is
collapsed onto the original prototype in order to provide its functionality.

Difference
----------

Whereas @fogus represents mixins as objects, here I use pure functions. The
expressive power is slightly greater as a mixin can do anything, not just what
is allowed by the rules for merging objects. More importantly, it's a unified
model of how to put things together that matches the function composition of
earlier chapters.

Caveat emptor
-------------

I am a Javasript n00b.

# toy-robot
Toy-robot is a program that lets you drive a robot from your terminal. He drives around on a 5*5 unit table and listens to the following commands:

* PLACE X,Y,F         - *Places the robot to on X,Y coordinates facing NORTH,SOUTH,EAST or WEST.*
* MOVE                - *Moves 1 unit in facing direction*
* LEFT                - *Rotates 90 degrees to left*
* RIGHT               - *Rotates 90 degrees to right*
* REPORT              - *Reports current position and facing direction*
* READ path/file.txt  - *Reads a .txt file if it has valid commands*

He won't listen to any command until he has been placed. He is also undestructable which means he doesn't respond to commands that would make him fall down from the table. If he can't act on command he will try to tell you why.
Check out the  [Code Challenge](challenge.md).

## Environments

This application was developed on Mac OSX 10.10.5, with Node.js 4.1.0. It should run without a problem on any UNIX system and probably on Windows too.

## Installation and Usage

Make sure that you have Node.js installed.
You can install Node from their website https://nodejs.org/.

cd to the root directory and invoke:

``` $ npm install ```

Now you can run the application with:

``` $ npm start ```

You can also run the test suite with:

``` $ npm test ```

If you dont want to use babel-node (which will be used whwn you invoke ```$ npm start``` you can compile to ES5 code and run the program manually with node.

```$ npm run build ```
```$ node lib/index.js```

## Design decisions and dependencies

I choosed to develop in a functional way. There is no mutation and the application is built up of pure/stateless functions. You wont find any *this* in this codebase.
I used  a test driven appoach, writing unit test with Mocha as testing library and Chai as assertion/expectation library. I always made sure to write tests before doing implementations. To help me not forgetting semi-colons and write with a consistent style I used ESLint.

I used Redux to help me manage the applications state. Redux keeps the whole applications state in a single immutable object.
This makes the application very predictable and scalable . It's also really nice to work with and you can structure your application in any way you want. 

Since Redux favours immutability I choosed to use Immutable.js to provide the data structures. It would be totally fine to use regular objects/arrays but then sooner or later someone's going to mutate.

When you run ```$ npm start``` ```node-babel index.js``` will be executed. If this was a bigger application going to production using babel-node would probably not be the best idea, since it compiles the JavaScript files on the fly. For this small CLI program I think its fine though, since its start in under a second (you can also easily compile it, see Installation and Usage). The main reason I use babel instead of just using Node.js ES2015 features is because Node.js doesn't support the new module syntax yet.

## Final thoughts

If I would continue adding some features I would probably add support for changing table size and an UNDO command. These features would be very easy to implement with this structure. Table size is already keept in state so I would just need to add and action for it. Undo is also fairly easy to implement with Redux, I would simple have to save a copy of the last state in the current state.

Something I could have done better is the validation messages. Right now its console.log spread all over. A nicer implementation would be to have a validation.messages.js file with functions, just like the action_creators.js file.

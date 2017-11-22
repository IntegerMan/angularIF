# Angular Interactive Fiction Engine

[![Greenkeeper badge](https://badges.greenkeeper.io/IntegerMan/angularIF.svg)](https://greenkeeper.io/)
An Angular 4 modern web application built around the old pieces of Interactive Fiction or text adventures of the 1980's and early 1990's.

## What is Interactive Fiction?
Back in the early days of computer gaming, Infocom came up with a wide variety of text-based adventure games where the game would describe its setting to you and you would interact with the game in the form of typing a command such as Pick up the lantern. The game would then parse your sentence, interpret your input into an intent, and attempt to execute it against its game logic, spitting out an authored response to the player. It allowed players to explore works of fiction and interact with worlds in many different ways, primarily non-combat puzzle solving gameplay in worlds that focused on being creative or telling an engaging story. Although [Interactive Fiction] (https://en.wikipedia.org/wiki/Interactive_fiction) (IF for short) hasn't gone away, it's never been as popular as it was in the 1980's, despite having [an active community of developers and gamers](http://ifdb.tads.org/). Typically development is done in a way to target applications mimicking the technology level of the original IF games and is written in author-friendly languages such as the fantastic [Inform 7](http://matteland.com/Projects/inform7.com) language.

## Why build another one? Why in Angular?
Over the course of my education from grade school to college, I built a number of Interactive Fiction game engines and parsers of varying complexity as I strove to learn programming and various languages. Although I've long since lost the code, I know I've written at least written implementations in QBasic, C++, Turbo Pascal, and .NET.

Recently I felt myself with a creative itch and a bit of nostalgia and wanted to revisit that type of a project that I hadn't touched since the early 2000's, and I wanted to do it in TypeScript with an Angular 4 front end, to see how such a project would look if it was coded entirely as an object-oriented game instead of as a programming language. I also wanted to take advantage of as many rich front-end technologies as I could in an attempt to freshen up the genre and get away from the more contemporary efforts that focus on trying to run code that executes in the same z-machine format as the original games from the prior century.

Additionally, the task of taking user input, tokenizing it into individual words, classifying those words, interpreting those words into a coherent sentence, and passing that sentence object on to an appropriate verb handler for whatever the user is trying to do is a very interesting technical problem that I would like to revisit now that I have over a decade of experience working professionally under my belt.

## What stories have you written for it?
At the moment I'm working on the core engine and an implementation of Roger Firth's Cloak of Darkness story, nearly the equivalent of a "Hello World" example in the IF community. While this is sufficiently more complex than displaying a "Hello World" message on the screen, the actual story itself is fairly trivial, even if the lexical analysis, tokenizing, verb handling, and representing the game world's internal state are not as trivial.

Once I have finished the Angular Cloak of Darkness example story, I plan to work on fleshing out the engine while writing a medium-sized story of my own.

The most recent version of the engine is available to interact with at https://gitlab.com/IntegerMan/angularIF

## Development Information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.5.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

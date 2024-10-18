### Testing Summary

## StickyNotes Test Cases

describe("Creates StickyNote")
-> Creates sticky note, holds tests for cases with just one note

describe("Creates 2 StickyNote")
-> Creates multiple sticky notes(in this case 2), holds test for cases with multiple notes(2)

test("Renders Create Note Form")
-> Checks if Create Note form is rendered when page is loaded

test("Creates Multiple Notes")
-> Creates two notes and checks if they are loaded in the page

test("Creates A Note and updates")
-> Creates a new note and updates the title, content, and category of the note

test("Updates multiple notes")
-> Creates new notes and updates the title, content, and category for both notes

test("Deletes notes")
-> Creates new note and then deletes the note

## ToDoList Test Cases

describe("Clicking ToDoList")
-> Holds tests that will interact with the to do list

test("Count updates for apple")
-> Checks apple, and checks if counter is updated to 1

test("Unchecks apple)
-> Unchecks apple, and checks if counter is updated to -1

test("Unchecks Banana")
-> Checks and unchecks banana, ensuring the counter is updated accordingly

test("Checks both apple and banana, checks counter")
-> Checks both apple and banana, makes sure counter is updated to +2
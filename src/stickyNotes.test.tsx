import { render, screen, fireEvent } from "@testing-library/react";
import StickyNotes  from "./StickyNotes";

describe("Create StickyNote", () => {
test("renders create note form", () => {
    render(<StickyNotes />);

    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
    });

    // TEST 1: CREATE
    test("creates new notes", () => {
    render(<StickyNotes />);

    // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
    screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
    target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    fireEvent.change(createNoteTitleInput, { target : { value: "Second New Note" } });
    fireEvent.change(createNoteContentTextarea, {
    target : { value: "Second Note content"}
    });
    fireEvent.click(createNoteButton)

    const newNoteTitle1 = screen.getByText("New Note");
    const newNoteContent1 = screen.getByText("Note content");
    const newNoteTitle2 = screen.getByText("Second New Note")
    const newNoteContent2 = screen.getByText("Second Note content")

    expect(newNoteTitle1).toBeInTheDocument();
    expect(newNoteContent1).toBeInTheDocument();
    expect(newNoteContent2).toBeInTheDocument();
    expect(newNoteTitle2).toBeInTheDocument();
    });

    // TEST 2: UPDATE 
    test("create new notes and update them", () => {
    render(<StickyNotes/>)

        // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
        screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
        target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    fireEvent.change(createNoteTitleInput, { target : { value: "Second New Note" } });
    fireEvent.change(createNoteContentTextarea, {
        target : { value: "Second Note content"}
    });
    fireEvent.click(createNoteButton)

    const newNoteTitle1 = screen.getByText("New Note");
    const newNoteContent1 = screen.getByText("Note content");

    expect(newNoteTitle1).toBeInTheDocument();
    expect(newNoteContent1).toBeInTheDocument();

    // update the text
    fireEvent.click(screen.getAllByTestId("Edit Title")[1])

    const contentTitle = screen.getByDisplayValue("New Note")
    
    fireEvent.change(contentTitle, { target : { value: "Updated Note Content"}})
    
    fireEvent.blur(contentTitle);
    
    const newTitle = screen.getByText("Updated Note Content");
    expect(newTitle).toBeInTheDocument();

    })

    // TEST 3: DELETE
    test("create new notes and delete them", () => {
    render(<StickyNotes/>)

        // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
        screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
        target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    fireEvent.change(createNoteTitleInput, { target : { value: "Second New Note" } });
    fireEvent.change(createNoteContentTextarea, {
        target : { value: "Second Note content"}
    });
    fireEvent.click(createNoteButton)

    const newNoteTitle1 = screen.getByText("New Note");
    const newNoteContent1 = screen.getByText("Note content");

    expect(newNoteTitle1).toBeInTheDocument();
    expect(newNoteContent1).toBeInTheDocument();

    // delete them now
    fireEvent.click(screen.getAllByTestId("Delete Button")[1])
    expect(newNoteTitle1).not.toBeInTheDocument()
    expect(newNoteContent1).not.toBeInTheDocument()
    })


});


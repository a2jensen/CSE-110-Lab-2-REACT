import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {ToDoList} from "./ToDoList"

describe("Clicking ToDoList", () => {
    test("Check If Items Are Displayed", () => {
        render(<ToDoList/>);

        const checkApples = screen.getByText("Apples")
        const checkBananas = screen.getByText("Bananas")

        expect(checkApples).toBeInTheDocument()
        expect(checkBananas).toBeInTheDocument()
    })

    test("Check If Count Updates for Apple", () => {
        render(<ToDoList/>);

        const checkApples = screen.getByTestId("Check=Apples")

        fireEvent.click(checkApples)
        
        const updatedCount = screen.getByText("Items bought: 1")
        
        expect(updatedCount).toBeInTheDocument();
    })

    test("Check If Count Updates for Banana", () => {
        render(<ToDoList/>);

        const checkBananas = screen.getByTestId("Check=Bananas")

        fireEvent.click(checkBananas)
        
        const updatedCount = screen.getByText("Items bought: 1")
        
        expect(updatedCount).toBeInTheDocument();
    })
    
})
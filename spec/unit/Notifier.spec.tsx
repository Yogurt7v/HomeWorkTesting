import { prettyDOM, render, screen } from "@testing-library/react";
import { Notifier } from "src/components/Notifier";
import uE from "@testing-library/user-event"
import { App } from "src/App";

const userEvent = uE.setup({
    advanceTimers: jest.advanceTimersByTime
})

describe('Окно оповещения', () => {
    it('автоматически исчезает с экрана через 2 секунды', async () => {
        const fn = jest.fn();

        render(<Notifier open={true} task="Любая задача" onClose={fn} />);

        jest.runAllTimers();

        expect(fn).toBeCalled();
    });

    it("при выполнении задачи должно появляться оповещение", async () => {
        render(<App />)
        const input = screen.getByRole('textbox')
        const addButton = screen.getByRole('button')

        await userEvent.type(input, 'Первая задача')
        await userEvent.click(addButton)

        const checkbox = screen.getByRole('checkbox')
        await userEvent.click(checkbox)

        expect(screen.getByText(/задача "первая задача" завершена/i)).toBeInTheDocument();


    })
});
import { prettyDOM, render, screen } from "@testing-library/react";
import { App } from "src/App";
import { JestStoreProvider } from "../utils/JestStoreProvider";
import uE from "@testing-library/user-event"


const userEvent = uE.setup({
    advanceTimers: jest.advanceTimersByTime
})

describe('Список задач', () => {
    // не содержит выполненные задачи
    // после нажатия на кнопку фильтрации
    it('Добавление и отображение задач и проверка отображения кнопки фильтрации', async () => {
        render(<App />, {
            wrapper: JestStoreProvider
        })

        const input = screen.getByRole('textbox')
        const button = screen.getByRole('button')

        await userEvent.type(input, 'Первая задача')
        await userEvent.click(button)
        await userEvent.type(input, 'Вторая задача')
        await userEvent.click(button)

        const filterButton = screen.getByText(/выполненные/)
        expect(filterButton).toBeInTheDocument()
    })
    // показывает как выполненные, так и не выполненные задачи
    // после повторного нажатия на кнопку фильтрации
    it.todo('с выключенным фильтром');
});

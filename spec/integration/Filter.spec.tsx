import { render, screen } from "@testing-library/react";
import { App } from "src/App";
import { JestStoreProvider } from "../utils/JestStoreProvider";
import uE from "@testing-library/user-event"

const userEvent = uE.setup({
    advanceTimers: jest.advanceTimersByTime
})
describe('Список задач', () => {
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
    it('с выключенным фильтром', async () => {
        render(<App />, {
            wrapper: JestStoreProvider
        })
        const input = screen.getByRole('textbox')
        const button = screen.getByRole('button')

        await userEvent.type(input, 'Первая задача')
        await userEvent.click(button)
        await userEvent.type(input, 'Вторая задача')
        await userEvent.click(button)
        const checkbox = screen.getAllByRole('checkbox')

        expect(checkbox).toHaveLength(2)

    })
    it('с включенным фильтром', async () => {
        const { rerender } = render(<App />, {
            wrapper: JestStoreProvider
        })
        const input = screen.getByRole('textbox')
        const button = screen.getByRole('button')

        await userEvent.type(input, 'Первая задача')
        await userEvent.click(button)
        await userEvent.type(input, 'Вторая задача')
        await userEvent.click(button)
        const checkbox = screen.getAllByRole('checkbox')

        const filterButton = screen.getByText(/выполненные/)
        await userEvent.click(checkbox[0])
        await userEvent.click(filterButton)

        expect(screen.getByText(/Вторая задача/)).toBeInTheDocument()

    });
    ;
});

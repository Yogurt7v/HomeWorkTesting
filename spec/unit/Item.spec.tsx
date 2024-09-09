import { render, screen, prettyDOM } from '@testing-library/react';
import { Input } from 'src/components/Input';
import { NewTaskBar } from 'src/modules/NewTaskBar';
import uE from '@testing-library/user-event'
import { JestStoreProvider } from '../utils/JestStoreProvider'
import { List } from 'src/components/List';

const userEvent = uE.setup({ advanceTimers: jest.advanceTimersByTime })


describe('Элемент списка задач', () => {
    it('название не должно быть больше 32 символов', () => {
        render(<Input value='Пример заголовка, содержащего больше 32 символов'
            onChange={() => { }}
            disabled={false}
            disabledMessage=''
        />)
        const labeltext = screen.getByTestId('input-hint-text')
        expect(labeltext.textContent).toBe('Длина заголовка не должна превышать 32 символа')
    });
    it('название не должно быть пустым', async () => {
        render(<NewTaskBar />, {
            wrapper: JestStoreProvider
        })
        const input = screen.getByRole('textbox')
        const addButton = screen.getByRole('button')
        await userEvent.click(input)

        expect(input).toHaveValue('')
        expect(addButton).toBeDisabled()
    });
    it('нельзя удалять невыполненные задачи', () => {
        const fn = jest.fn()
        const mockItems: Task[] = [{
            id: "1",
            header: 'Первая задача',
            done: false,
        },
        {
            id: "2",
            header: 'Вторая задача',
            done: true,
        }
        ]

        render(<List items={mockItems} onDelete={fn} onToggle={() => undefined} />)

        const deleteButton1 = screen.getAllByRole('button')[0]
        const deleteButton2 = screen.getAllByRole('button')[1]

        expect(deleteButton1).toBeDisabled()
        expect(deleteButton2).not.toBeDisabled()

    });
});
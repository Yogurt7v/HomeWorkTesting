import { render, screen, prettyDOM } from '@testing-library/react';
import { Input } from 'src/components/Input';
import { NewTaskBar } from 'src/modules/NewTaskBar';
import uE from '@testing-library/user-event'
import { JestStoreProvider } from '../utils/JestStoreProvider'
import { Item } from 'src/components/Item';

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
        render(<Item />)
    });
});
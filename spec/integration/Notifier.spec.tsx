import { render, screen } from "@testing-library/react";
import { Notifier } from "src/components/Notifier";

describe('Оповещение при выполнении задачи', () => {
    it('появляется и содержит заголовок задачи', () => {
        render(<Notifier open={true} task="Любая задача" onClose={() => { }} />);
        expect(screen.getByText('Любая задача')).toBeInTheDocument();
    });
    it('одновременно может отображаться только одно', () => {
        const { rerender } = render(<Notifier open={true} task="Любая задача1" onClose={() => { }} />);

        rerender(<Notifier open={true} task="Любая задача2" onClose={() => { }} />);
        expect(screen.getByText('Любая задача2')).toBeInTheDocument();
        expect(screen.queryByText('Любая задача1')).not.toBeInTheDocument();
    });
});
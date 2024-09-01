interface FilterButtonProps {
    buttonName: string;
    onClick: () => void;
}
export function FilterButton({ onClick, buttonName }: FilterButtonProps) {
    return <button className="button button-filter" onClick={onClick}>{buttonName}</button>;
}
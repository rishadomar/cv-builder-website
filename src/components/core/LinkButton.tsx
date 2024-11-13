type LinkButtonProps = {
    onClick: () => void;
    label: string;
    disabled?: boolean;
};

export default function LinkButton({ onClick, label, disabled }: LinkButtonProps) {
    return (
        <button
            type='button'
            className='text-sm text-blue-500 hover:underline focus:outline-none'
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

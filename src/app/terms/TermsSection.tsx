export const TermsList = ({ lines }: { lines: string[] }) => (
    <ul className='list-disc list-inside'>
        {lines.map((line, index) => (
            <li key={index}>{line}</li>
        ))}
    </ul>
);

export const TermsSection = ({
    title,
    description,
    lines
}: {
    title: string;
    description?: string;
    lines?: string[];
}) => (
    <div className='mb-4'>
        <h2 className='text-lg font-bold mb-2'>{title}</h2>
        {description && <h3 className='mb-2'>{description}</h3>}
        {lines && <TermsList lines={lines} />}
    </div>
);

'use client';

import { complete } from '@/api/openai/openaiApi';
import { useState } from 'react';

const TestingPage: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [reply, setReply] = useState<string>('');

    return (
        <div>
            <h1>Testing</h1>
            <textarea
                rows={10}
                cols={50}
                placeholder='Enter text here'
                className='border border-gray-300 rounded p-2 text-black font-medium'
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                }}
            />
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={async () => {
                    console.log(`Button clicked: ${text}`);
                    const response = await complete(text);
                    setReply(response);
                }}
            >
                Submit
            </button>
            <textarea
                rows={10}
                cols={50}
                readOnly
                className='border border-gray-300 rounded p-2 text-black font-medium'
                value={reply}
            />
        </div>
    );
};

export default TestingPage;

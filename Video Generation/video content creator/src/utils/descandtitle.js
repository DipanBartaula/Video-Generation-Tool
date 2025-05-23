import axios from 'axios';

const postData = async (text) => {
    const url = 'http://127.0.0.1:7000/chat';
    const payload = {
        text: `Can you give title and 30 word description of the given paragraph  ${text} `,
    };

    try {
        const response = await axios.post(url, payload, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        console.log('Response:', response.data);    
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};


export const separateTitleAndDescription = (text) => {
    const titleMatch = text.match(/Title: "(.*?)"/);
    const descriptionMatch = text.match(/Description: (.*)/);

    if (titleMatch && descriptionMatch) {
        return {
            title: titleMatch[1],
            description: descriptionMatch[1],
        }
    }
};


export default postData; 
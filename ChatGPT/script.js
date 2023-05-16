const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageContainer = document.getElementById('message-container');

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        appendMessage('user', message);
        messageInput.value = '';

        const botMessage = await getBotResponse(message);
        appendMessage('bot', botMessage);
    }
}

function appendMessage(sender, content) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender);
    messageElement.textContent = content;

    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

async function getBotResponse(message) {
    const API_KEY = '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';
    const API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                prompt: message,
                max_tokens: 50,
                temperature: 0.6
            })
        });

        if (!response.ok) {
            throw new Error('Error fetching bot response');
        }

        const data = await response.json();
        return data.choices[0].text.trim();
    } catch (error) {
        console.error('Error fetching bot response:', error);
        return 'Bot encountered an error.';
    }
}

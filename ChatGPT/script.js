const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messagesDiv = document.getElementById('messages');
let isSending = false;

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

class Message {
    constructor(content, sender) {
        this.content = content;
        this.sender = sender;
    }

    createElement() {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container');
        messageContainer.classList.add(this.sender === 'user' ? 'user' : 'bot');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.innerText = this.content;

        messageContainer.appendChild(messageContent);

        return messageContainer;
    }
}

async function sendMessage() {
    if (isSending) return;
    const message = messageInput.value.trim();
    if (message !== '') {
        isSending = true;
        const userMessage = new Message(message, 'user');
        const userMessageElement = userMessage.createElement();
        messagesDiv.appendChild(userMessageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        messageInput.value = '';

        const botMessage = await getBotResponse(message);
        const botMessageElement = botMessage.createElement();
        messagesDiv.appendChild(botMessageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        isSending = false;
    }
}

async function getBotResponse(message) {
    try {
        // API request
        // ...
    } catch (error) {
        console.error('Error fetching bot response:', error);
        return new Message('Bot encountered an error.', 'bot');
    }
}

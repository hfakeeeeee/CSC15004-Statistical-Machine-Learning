let conversation = [];
let isSingleUserMode = false; // Default mode is two-user input

function toggleInputMode() {
    isSingleUserMode = !isSingleUserMode;
    
    const user1Input = document.getElementById('user1-input');
    const user2Input = document.getElementById('user2-input');
    
    if (isSingleUserMode) {
        user2Input.style.display = 'none';
        user1Input.placeholder = 'User: Enter your text';
    } else {
        user2Input.style.display = 'block';
        user1Input.placeholder = 'User 1: Enter your text';
    }

    // Clear the conversation history
    conversation = [];
}

function showHistory() {
    const historyPopup = document.createElement('div');
    historyPopup.id = 'history-popup';
    historyPopup.classList.add('popup');

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('popup-close');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => historyPopup.remove();
    historyPopup.appendChild(closeBtn);

    const historyContent = document.createElement('div');
    historyContent.classList.add('popup-content');

    for (let i = 0; i < conversation.length; i++) {
        const historyItem = document.createElement('p');
        historyItem.textContent = `${conversation[i]}`;
        historyContent.appendChild(historyItem);
    }

    historyPopup.appendChild(historyContent);

    document.body.appendChild(historyPopup);
}

function addInput() {
    const user1Input = document.getElementById('user1-input').value.trim();
    const user2Input = document.getElementById('user2-input').value.trim();

    if (user1Input || user2Input) {
        if (user1Input) conversation.push(user1Input);
        if (user2Input) conversation.push(user2Input);

        document.getElementById('user1-input').value = '';
        document.getElementById('user2-input').value = '';
    }
}

function summarizeConversation() {
    if (conversation.length > 0) {
        const conversationText = conversation.join(' ');
        fetch('/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paragraph: conversationText }),
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('summary').textContent = data.summary;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

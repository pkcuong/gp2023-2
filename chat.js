import React, { useEffect, useState } from 'react';
import { client, xml } from '@xmpp/client';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [xmpp, setXmpp] = useState(null);
  

  useEffect(() => {
      const xmppClient = client();

      xmppClient.on('online', (address) => {
        console.log('online as', address.toString());
      });

      xmppClient.on('error', (err) => {
        console.error('error', err);
      });

      xmppClient.on('stanza', (stanza) => {
        if (stanza.is('message')) {
          const from = stanza.attrs.from;
          const body = stanza.getChildText('body');
          const message = { from, body };
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });

      xmppClient.start().catch(console.error);
      setXmpp(xmppClient);
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (xmpp) {
      const message = xml('message', { type: 'chat', to: 'testuser@gp2023.duckdns.org' });
      message.c('body').t(messageInput);
      xmpp.send(message);
      setMessageInput('');
    }
  };

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.from}: </strong>
            {message.body}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input type="text" value={messageInput} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
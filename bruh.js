import React, { useState, useEffect } from 'react';
import { client } from '@xmpp/client';
import { createElement } from '@xmpp/xml';
import { useLocation } from 'react-router-dom';

function Chat() {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [xmppClient, setXmppClient] = useState(null);
  const location = useLocation();
  const { state } = location;
  const { username, password } = state || {};
  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const messageStanza = createElement('message', { to: recipient, type: 'chat' }, [
        createElement('body', {}, message),
      ]);

      await xmppClient.send(messageStanza);

      console.log('Message sent successfully!');
      // Handle success, e.g., show a success message or reset the form
    } catch (error) {
      console.error('Failed to send the message', error);
      // Handle error, e.g., show an error message
    }
  };

  useEffect(() => {
    const xmpp = client();

    xmpp.on('stanza', (stanza) => {
      if (stanza.is('message')) {
        const from = stanza.attrs.from;
        const body = stanza.getChildText('body');
        console.log('Received message from', from, ':', body);
        setReceivedMessages((prevMessages) => [...prevMessages, { from, body }]);
      }
    });

    const connect = async () => {
      try {
        await xmpp.start({
          // Replace with your Ejabberd server details
          service: 'ws://gp2023.duckdns.org:5280/ws',
          domain: 'gp2023.duckdns.org',
          username: username,
          password: password,
        });

        setXmppClient(xmpp);
      } catch (error) {
        console.error('Failed to connect to XMPP server', error);
      }
    };

    connect();

    return () => {
      if (xmppClient) {
        xmppClient.stop();
      }
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipient:</label>
          <input type="text" value={recipient} onChange={handleRecipientChange} />
        </div>
        <div>
          <label>Message:</label>
          <textarea value={message} onChange={handleMessageChange} />
        </div>
        <button type="submit">Send Message</button>
      </form>

      <h2>Received Messages:</h2>
      {receivedMessages.map((msg, index) => (
        <p key={index}>
          <strong>From: {msg.from}</strong>
          <br />
          {msg.body}
        </p>
      ))}
    </div>
  );
}

export default Chat;
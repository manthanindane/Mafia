import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io();

const Lobby = () => {
    const [playerName, setPlayerName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [users, setUsers] = useState([]);
    const [showGame, setShowGame] = useState(false);

    const handleNameSubmit = () => {
        localStorage.setItem('playerName', playerName);
        setShowGame(true);
    };

    const handleCreateRoom = () => {
        const storedName = localStorage.getItem('playerName');
        if (roomId && storedName) {
            socket.emit('createRoom', roomId, storedName);
        }
    };

    const handleJoinRoom = () => {
        const storedName = localStorage.getItem('playerName');
        if (roomId && storedName) {
            socket.emit('joinRoom', roomId, storedName);
        }
    };

    socket.on('updateRoom', (users) => {
        setUsers(users);
    });

    return (
        <div>
            {!showGame && (
                <div>
                    <h2>Enter Your Name</h2>
                    <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Your Name" />
                    <button onClick={handleNameSubmit}>Submit</button>
                </div>
            )}
            {showGame && (
                <div>
                    <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Room ID" />
                    <button onClick={handleCreateRoom}>Create Room</button>
                    <button onClick={handleJoinRoom}>Join Room</button>
                    <div>Room members: {users.join(', ')}</div>
                </div>
            )}
        </div>
    );
};

export default Lobby;

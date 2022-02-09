CREATE TABLE users ( 
    id BIGSERIAL PRIMARY KEY NOT NULL ,
    username VARCHAR(25) UNIQUE NOT NULL,
    email VARCHAR(55) NOT NULL,
    password VARCHAR(255) NOT NULL ,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT NOW(),
    user_id INT NOT NULL ,
    FOREIGN KEY (user_id) 
    REFERENCES users(id) ON DELETE CASCADE
)
SELECT * FROM messages INNER JOIN users ON messages.user_id = users.id ORDER BY created_at
SELECT messages.message, messages.sent_at, users.username from messages JOIN users ON messages.user_id= users.id order by sent_at

CREATE TABLE connected_users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(25) NOT NULL,
    chat_id VARCHAR(55) NOT NULL ,
    room VARCHAR(25) NOT NULL,
    joined_at TIMESTAMP DEFAULT NOW()
)
INSERT INTO connected_users ( username , chat_id , room ) values ('test', '546fd4v654f6d46g4f' , 'Room' );
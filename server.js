const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;

const messages = [];

let messageIdCounter = 1; // メッセージIDのためのカウンター

//Nodeサーバにアクセスがあるとindex.htmlへ遷移
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket){
    var loginUsers = [];

    //ログイン処理
    console.log("ユーザーが接続しました");

    socket.on('login', function(userInfo){
        loginUsers[userInfo.userID] = userInfo.userName;
    });

    //メッセージ処理
    socket.on("chat message", function(msg){
        userName = loginUsers[socket.id];
        io.emit('chat message', {
            userName: userName,
            message: msg
        });
    


        // // 新しいメッセージのIDを生成
        // const messageId = messageIdCounter++;
        
        // // クライアントに送信するメッセージオブジェクト
        // const messageObject = {
        //     id: messageId,
        //     text: msg.text,
        //     replies: [], // リプライの格納先
        // };

        // // 親コメントへの返信の場合
        // if (msg.replyTo) {
        //     const parentMessage = messages.find((m) => m.id === msg.replyTo);
        //     if (parentMessage) {
        //         parentMessage.replies.push(messageObject);
        //     }
        // } else {
        //     // メインのメッセージとして保存
        //     messages.push(messageObject);
        // }

        // io.emit("chat message", messageObject);

        // // io.emit("chat message", msg);
    });
});

server.listen(PORT, () => {
    console.log("listening on 3000");
});
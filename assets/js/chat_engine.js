class chatEngine{
    constructor(chatBoxId, userEmail){//condtructor take two arguments id and email by which chat is initiated by which we know who send the message
 this.chatBox=$(`#${chatBoxId}`);
 this.userEmail=userEmail;



 this.socket= io.connect('http//localhsot:5000');

 if(this.userEmail){
     this.connectionHandler();
 }
    }

    connectionHandler(){

        let self= this;


        this.socket.on('connection',function(){
            console.log('connection established using the socket....!');
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'codeial'

            });

            self.socket.on('user_join',function(data){
                console.log('a user joined !',data);
            })

            
        });

        // send the message on clicking the send message button

              $('#send-message').click(function(){
                let msg =$('#chat-message-input').val();

                if(msg != ''){

                    self.socket.emit('send_message',{
                        message:msg,
                        user_email:self.userEmail,
                        chatroom:'codeial'
                    })
                }
              });

              self.socket.on('recive_message' , function(data){
                console.log('message recived', data.message);

                let newMessage = $('<li>');
                
                let messageType= 'other-message';
                if(data.user_email==self.userEmail){
                     messageType='self-message'
                }

                newMessage.append($('<span>',{
                    'html':data.message
                }));
                newMessage.append($('<sub>',{
                    'html':data.user_email
                }));

                newMessage.addClass(messageType);
                 $('#chat-message-list').append(newMessage);

                
              })


    }
}
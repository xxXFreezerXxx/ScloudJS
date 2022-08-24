const cloud=require("./cloud");

const tasks = async()=>{
  await cloud.signin("accountname","password");
  const socket = await cloud.connecttoserver();
  socket.onopen= function(){
    cloud.handshake("projectid");
  }
/*上のコードはアカウント名とパスワードを入れるところ以外は変えないほうがいい。*/

  socket.onmessage = function(event){
//    const clouddata = cloud.sort(event.data);
//    console.log(clouddata.datas);
//    cloud.sendtocloud("HOST",Math.floor(Math.random()*20));
//↑は例です
  }
  
}
tasks();


const WebSocket=require("ws");
const login=require("./login");
class Info{
    constructor(username,password,sessionid,projectid){
        this.username=username;
        this.password=password;
        this.sessionid=sessionid;
        this.projectid=projectid;
    }
  }
  class Cloud{
    constructor(datas,change){
        this.datas=datas;
        this.change=change;
    }
  }
let info="";
let sessionid="";
let socket="";
let cloud=new Cloud({},[]);
const signin = async(username,password)=>{
    sessionid = await login.login(username,password);
    info=new Info(username,password,sessionid,"");
} 
function connecttoserver(){
    socket = new WebSocket("wss://clouddata.scratch.mit.edu/", {
          headers :{
              "origin": "https://scratch.mit.edu",
              "Cookie": "scratchsessionsid="+sessionid+";"
          }
        });
        return socket;
}
function handshake(id){
    socket.send(`${JSON.stringify({ "method": "handshake", "user": info.username, "project_id": id , 
    headers : {cookie: 'scratchsessionsid=' + sessionid + ';', origin: 'https://scratch.mit.edu'}})}\n`);
    info.projectid=id;
}
function sort(response){
    cloud.change=[];
    response = response.split("\n");
    response.splice(response.length-1,1);
    for(let i=0;i<response.length;i++){
      response[i]=JSON.parse(response[i]);
      response[i].name=(response[i].name).match(/[A-Z]+/ig)[0];
      cloud.change.push(response[i].name);
      cloud.datas[response[i].name]=response[i].value;
      
    }
    return cloud;
}
function sendtocloud(name,value){
    socket.send(`${JSON.stringify({"method":"set","user":info.username,"project_id":info.projectid,"name":"☁ "+name,"value":value,
    headers : {cookie: 'scratchsessionsid=' + sessionid + ';', origin: 'https://scratch.mit.edu'}})}\n`);
    sort(JSON.stringify({"name":"☁ "+name,"value":value})+"\n");
}
module.exports= {
    signin,
    connecttoserver,
    handshake,
    sendtocloud,
    sort
}
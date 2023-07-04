// ==UserScript==
// @name         Gartic.io Bulunduğun Odadaki WebSocket i dinle
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Bu script ile bir odaya girdiğinizde websocketi dinlersiniz. oyundayken konsoldan wsObj.send() ile oyuna veri gönderebilirsin. wsObj.id ile o andaki odadaki idnizi verir wsObj.lengthID harflerden oluşan idnizi verir
// @author       YGN
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==
let originalSend = WebSocket.prototype.send,setTrue=false;
window.wsObj={}

WebSocket.prototype.send=function(data){
    console.log("Gönderilen Veri: "+data)
    originalSend.apply(this, arguments)
    if(Object.keys(window.wsObj).length==0){window.wsObj=this;window.eventAdd()}
};

window.eventAdd=()=>{
    if(!setTrue){
        setTrue=1
        window.wsObj.addEventListener("message",(msg)=>{
            try{
                let data=JSON.parse(msg.data.slice(2))
                console.log(data)
                if(data[0]==5){
                    window.wsObj.lengthID=data[1]
                    window.wsObj.id=data[2]
                    window.wsObj.roomCode=data[3]
                }
            }catch(err){}
        })
    }
}



navigator.getWebcam = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

// PeerJS object ** FOR PRODUCTION, GET YOUR OWN KEY at http://peerjs.com/peerserver **

var peer=new Peer({
                    debug:3,
                    config:{'iceServers':[
        {url:'stun:stun01.sipphone.com'},
        {url:'stun:stun.ekiga.net'},
        {url:'stun:stun.fwdnet.net'},
        {url:'stun:stun.ideasip.com'},
        {url:'stun:stun.iptel.org'},
        {url:'stun:stun.rixtelecom.se'},
        {url:'stun:stun.schlund.de'},
        {url:'stun:stun.l.google.com:19302'},
        {url:'stun:stun1.l.google.com:19302'},
        {url:'stun:stun2.l.google.com:19302'},
        {url:'stun:stun3.l.google.com:19302'},
        {url:'stun:stun4.l.google.com:19302'},
        {url:'stun:stunserver.org'},
        {url:'stun:stun.softjoys.com'},
        {url:'stun:stun.voiparound.com'},
        {url:'stun:stun.voipbuster.com'},
        {url:'stun:stun.voipstunt.com'},
        {url:'stun:stun.voxgratia.org'},
        {url:'stun:stun.xten.com'},
                        {url:'turn:e4.xirsys.com:80?transport=udp',username:'321df104-a52b-11e8-8a17-57048023a35c',credential:'321df17c-a52b-11e8-92cc-e6fed391c29b'},
                        {url:'turn:e4.xirsys.com:3478?transport=udp',username:'321df104-a52b-11e8-8a17-57048023a35c',credential:'321df17c-a52b-11e8-92cc-e6fed391c29b'}

                    ]}});

peer.on('open',function(){
    $('#my-id').text(peer.id);
});

peer.on('call',function(call){
    //Answer automatically for demo
    call.answer(window.localStream);
    step3(call);
})

//Click handlers setup
$(function(){
    $('#make-call').click(function(){
        //Initiate a call
        var call=peer.call($('#callto-id').val(),window.localStream);
        step3(call);
    });
    $('#end-call').click(function(){
        window.existingCall.close();
        step2();
    });

    //Retry if getUserMedia fails
    $('#step1-retry').click(function(){
        $('#step1-error').hide();
    });

    //Get things started
    step1();
});

function step1(){
    //Get audio/video stream
    navigator.getWebcam({audio:false,video:true},function(stream){
        //DIsplay the video stream in the video object
        $('#my-video').prop('src',URL.createObjectURL(stream));

        window.localStream=stream;
        step2();
    },function(){
        $('#step-error').show();
    });
}

function step2(){//Adjust the UI
    $('#step1','#step3').hide();
    $('#step2').show();
}

function step3(call){
    //Hang up on an existing call if present
    if(window.existingCall){
        window.existingCall.close();
    }

    call.on('stream',function(stream){
        $('#their-video').prop('src',URL.createObjectURL(stream));
    });
    $('#step1','#step2').hide();
    $('#step3').show();
}







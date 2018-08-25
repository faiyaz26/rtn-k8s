
var app = new Vue({
    el: "#app",
    data: {
        connection_status: null,
        user_id: null,
        server_hostname : null,
        notification_count : 0,
    },
    methods: {
        markAllRead: function(){
            this.notification_count = 0;
        },
        generateNotification: function(){
            axios.post('/notify', {
                user_id: this.user_id
            }).then(function(data){
                toastr["success"]("Notification generated!");
            });
        },
        updateData(data){
            if(data.user_id == this.user_id){
                return;
            }
            this.notification_count += 1;
            toastr["info"]("from user: " + data.user_id, "New notification!");
        }
    }
});

var notification_channel = 'notification_channel';
var socket = io();

socket.on('connect', () => {
    app.connection_status = socket.connected;
    app.user_id = socket.id;
});

socket.on('initial_data', function(data){
    app.server_hostname = data.server_hostname;
});

socket.on(notification_channel, function(data){
    app.updateData(data);
});
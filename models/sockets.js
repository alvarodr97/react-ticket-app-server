const TicketList = require("./ticket-list");


class Sockets {

    constructor( io ) {

        this.io = io;

        // Crear la instancia de TicketList
        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('cliente conectado');
            
            socket.on('solicitar-ticket', (data, callback) => {
                callback(this.ticketList.crearTicket());
            });

            socket.on('siguiente-ticket-trabajar', ({ agente, escritorio}, callback) => {
                callback(this.ticketList.asignarTicket(agente, escritorio));

                this.io.emit('ticket-asignado', this.ticketList.ultimos13);
            })
        
        });
    }


}


module.exports = Sockets;
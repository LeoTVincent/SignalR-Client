import { Injectable } from '@angular/core';
import * as SignalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor() { }

  hubConnection:SignalR.HubConnection | undefined;
  startConnection = () =>{
    this.hubConnection = new SignalR.HubConnectionBuilder()
    .withUrl('https://localhost:5001/toastr',{
      skipNegotiation:true,
      transport: SignalR.HttpTransportType.WebSockets
    })
    .build();

    this.hubConnection
    .start()
    .then(() => {
      console.log('Hub connection has started!');
    })
    .catch(err => console.log('Error while starting connection: '+ err))
  }

  askServer(){
    console.log('start of askServer method');
    this.hubConnection?.invoke('askServer','hey')
    .catch(err => console.error(err));
    console.log('end of askServer method');
  }

  askServerListener(){
    console.log('start of askServerListener method');
    this.hubConnection?.on('askServerResponse',(someText) =>{
      console.log(someText);
    })
    console.log('end of askServerListener method');
  }
}

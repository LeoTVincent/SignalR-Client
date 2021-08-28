import { Injectable } from '@angular/core';
import * as SignalR from '@aspnet/signalr';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
public connectionID:string='';
  constructor(private http: HttpClient) { }

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
  startHttpConnection(){
    console.log(this.connectionID);
    return this.http.get('https://localhost:5001/api/StatusCheck',{params: {id:this.connectionID}})
    .subscribe(res =>{
      console.log(res);
    });
  }
  askServer(){
    console.log('start of askServer method');
    this.hubConnection?.invoke('askServer')
    .catch(err => console.error(err));
    console.log('end of askServer method');
  }

  askServerListener(){
    console.log('start of askServerListener method');
    this.hubConnection?.on('askServerResponse',(connectionID) =>{
      this.connectionID=connectionID;
    })
    console.log('end of askServerListener method');
  }
}

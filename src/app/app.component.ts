import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'SignalR-Client';
  msgFromSignalR:any;
  constructor(public signalrService: SignalrService,private http: HttpClient){}
    
  ngOnInit(): void {
    this.signalrService.startConnection();
    this.addTransferDataListener();
      
    setTimeout(() =>{
      this.signalrService.askServer();
      this.signalrService.askServerListener();
      
    }, 2000)

    setTimeout(() =>{
      this.signalrService.startHttpConnection();
    },15000)
  }
  addTransferDataListener(){
    this.signalrService.hubConnection?.on('transferData',(data)=>{
      console.log(data);
    })
  }
  ngOnDestroy(): void {
    this.signalrService.hubConnection?.off('transferData');
  }
}

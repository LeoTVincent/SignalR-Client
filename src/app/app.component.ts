import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'SignalR-Client';

  constructor(public signalrService: SignalrService){}
    
  ngOnInit(): void {
    this.signalrService.startConnection();

    setTimeout(() =>{
      this.signalrService.askServer();
      this.signalrService.askServerListener();
      
    }, 2000)
  }
  
  ngOnDestroy(): void {
    this.signalrService.hubConnection?.off('askServerResponse');
  }
}

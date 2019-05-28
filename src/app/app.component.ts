import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



 

export class AppComponent {
  title = 'PCD - Homework 5';
  
  ngOnInit() {
    console.log('Contacting PrivateSky...');
    
    // @ts-ignore
    const interact = pskclientRequire("interact");
    // @ts-ignore
    interact.enableRemoteInteractions();
    // @ts-ignore
    const ris = interact.createRemoteInteractionSpace('testRemote', 'http://127.0.0.1:8080', 'localhost/agent/example');
    
    ris.startSwarm('Echo', 'say', "Hello world!")
      .onReturn(function(info: any) {
        console.log(`Returning message "${info}"` );
    });

    ris.startSwarm('Candidate', 'init', "aasssddd", "aaasssddd", "Mike", "Pence")
      .onReturn(function(info: any) {
        console.log(`Created account: "${info}"`);
    });


  }

} 
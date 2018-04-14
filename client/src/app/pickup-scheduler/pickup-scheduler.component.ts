import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { WasteRequestService } from '../services/waste-request.service';
import 'moment';
import 'fullcalendar';
@Component({
  selector: 'app-pickup-scheduler',
  templateUrl: './pickup-scheduler.component.html',
  styleUrls: ['./pickup-scheduler.component.css']
})
export class PickupSchedulerComponent implements OnInit {
    requests: any[];   
    headerConfig: any;
    dialogVisible: boolean = false;
    constructor(private wasteRequestService: WasteRequestService) { }  
    
    getData(){
        this.wasteRequestService.getRequests().then(response => {
            this.requests = response.scheduler;
            
        },
            error => {
                console.log(error);
                
            }
        
        )
    }
    /* eventRender(event,element) {
        element.popover({
            title: "title",
            content: 'event.description',
            trigger: 'hover',
            placement: 'top',
            container: 'body'
          });
    } */
    ngOnInit() {
        
        this.headerConfig = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
        this.getData();
    }

}

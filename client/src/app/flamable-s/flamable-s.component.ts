import { Component, OnInit } from '@angular/core';
import { StorageFs } from '../storage';
import { StorageFs1 } from '../storage';
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-flamable-s',
  templateUrl: './flamable-s.component.html',
  styleUrls: ['./flamable-s.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class FlamableSComponent implements OnInit {

  selectedDataFs: StorageFs;
  selectedDataFs1: StorageFs1;

  datasFs: StorageFs[];
  datasFs1: StorageFs1[];

  constructor(private storageService: StorageService) { }



  ngOnInit() {
    this.getDataFs();
    this.getDataFs1();


  }



  onSelectFs(data: StorageFs): void {
    this.selectedDataFs = data;
  }
  onSelectFs1(data1: StorageFs1): void {
    this.selectedDataFs1 = data1;
  }

  getDataFs(): void {
  this.storageService.getDataFs()
      .subscribe(datasFs => this.datasFs = datasFs);
  }

  getDataFs1(): void {
  this.storageService.getDataFs1()
    .subscribe(datasFs1 => this.datasFs1 = datasFs1);
  }


}
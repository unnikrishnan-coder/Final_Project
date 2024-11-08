import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faLocation, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
avatar: string = "/assets/profile-pic.png";
homeIcon = faHome;
  locationIcon = faLocation;
  saveIcon = faSave;
  @Input() serviceTitle:string = "";
  @Input() servicePrice:number=0;
  @Input() serviceCategory:string="";
  @Input() serviceLocation:string="";

  
}

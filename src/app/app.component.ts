import { Component, computed, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { MainComponent } from './Component/main/main.component';
import { SideBarComponent } from './Component/home/side-bar/side-bar.component';
import { routes } from './app.routes';
import { UserMasterComponent } from './Component/user-master/user-master.component';
import { AddUserComponent } from './Component/home/add-user/add-user.component';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav'
// import { SideBarComponent } from "./Component/home/side-bar/side-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent,MainComponent,SideBarComponent,UserMasterComponent,AddUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AttendenceSystem';

//   collapsed = signal(false);

//   sidenavwidth = computed(()=> this.collapsed() ? '65px' : '250px')
 }

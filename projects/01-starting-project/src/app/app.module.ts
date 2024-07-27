import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TasksComponent } from './tasks/tasks.component';
import { UserComponent } from './user/user.component';
import { BrowserModule } from '@angular/platform-browser';
import { CardComponent } from './shared/card/card.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, UserComponent, CardComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, TasksComponent],
})
export class AppModule {}

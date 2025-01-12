import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "app";

  constructor(private router: Router) {}

  redirect() {
    this.router.navigate(["choose-content"]);
  }
}

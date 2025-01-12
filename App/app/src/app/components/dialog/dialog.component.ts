import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrl: "./dialog.component.scss",
})
export class DialogComponent {
  platform = "";
  input = "";
  error = false;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit() {
    if (this.data == "social") this.platform = "Instagram";
  }

  selectPlatform(platform: any) {
    this.platform = platform;
  }

  generatePost() {
    if (this.data == "blog") this.platform = "Blog";
    if (this.data == "meta") this.platform = "MetaDescription";
    if (this.input == "") {
      this.error = true;
    } else {
      this.router.navigate(["create-post"], {
        queryParams: {
          type: this.platform,
          idea: this.input,
        },
      });
      this.close();
    }
  }

  close() {
    this.dialogRef.close();
  }
}

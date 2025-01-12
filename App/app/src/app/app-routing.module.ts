import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChooseContentComponent } from "./components/choose-content/choose-content.component";
import { IdeasGeneratorComponent } from "./components/ideas-generator/ideas-generator.component";
import { CreatePostComponent } from "./components/create-post/create-post.component";

const routes: Routes = [
  { path: "choose-content", component: ChooseContentComponent },
  { path: "", redirectTo: "/choose-content", pathMatch: "full" },
  { path: "ideas-generator", component: IdeasGeneratorComponent },
  { path: "create-post", component: CreatePostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

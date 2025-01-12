import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-ideas-generator",
  templateUrl: "./ideas-generator.component.html",
  styleUrl: "./ideas-generator.component.scss",
})
export class IdeasGeneratorComponent {
  url = "https://api.openai.com/v1/chat/completions";
  platform = "";
  keyword = "";
  idea = "";
  result: any;
  messages: any = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Your are an tool that helps content creators get ideas.",
      },
      {
        role: "user",
        content:
          'Give me content ideas. Response should be in json format only with topic type, ideas under each type. Only give 4 topics. Format should be {"topic 1" :["idea 1", "idea 2", "idea 3"],"topic 2" :["idea 1", "idea 2", "idea 3"]}. You have to sort the ideas based on topic names. Topic name cannot be topic 1 or topic 2, it should be an actual topic.',
      },
    ],
  };

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer YOUR_API_KEY_HERE",
      Accept: "application/json",
    }),
  };

  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  sendPostRequest(data: any): Observable<any> {
    return this.http.post<any>(this.url, data, this.httpOptions);
  }

  selectPlatform(platform: any) {
    this.platform = platform;
  }

  generateIdeas() {
    this.loading = true;
    this.idea = "";
    if (this.platform != "")
      this.messages.messages[1].content =
        "Give me content ideas for a" +
        this.platform +
        '. Response should be in json format only with topic type, ideas under each type. Only give 4 topics. Format should be {"topic 1" :["idea 1", "idea 2", "idea 3"],"topic 2" :["idea 1", "idea 2", "idea 3"]}. You have to sort the ideas based on topic names. Topic name cannot be topic 1 or topic 2, it should be an actual topic. Keyword is ' +
        this.keyword;
    else
      this.messages.messages[1].content =
        'Give me content ideas. Response should be in json format only with topic type, ideas under each type. Only give 4 topics. Format should be {"topic 1" :["idea 1", "idea 2", "idea 3"],"topic 2" :["idea 1", "idea 2", "idea 3"]}. You have to sort the ideas based on topic names. Topic name cannot be topic 1 or topic 2, it should be an actual topic. Keyword is ' +
        this.keyword;
    this.sendPostRequest(this.messages).subscribe((response) => {
      this.result = JSON.parse(response.choices[0].message.content);
      this.loading = false;
    });
  }

  getTopics() {
    return Object.keys(this.result);
  }

  selectIdea(idea: any) {
    this.idea = idea;
  }

  generatePost() {
    this.router.navigate(["create-post"], {
      queryParams: {
        type: this.platform,
        idea: this.idea,
      },
    });
  }
}

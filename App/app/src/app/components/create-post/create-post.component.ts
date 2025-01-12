import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrl: "./create-post.component.scss",
})
export class CreatePostComponent {
  postType = "";
  idea = "";
  blogMessage = "";
  socialMessage = "";
  metaMessage = "";
  url = "https://api.openai.com/v1/chat/completions";
  messages: any = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Your are an tool that helps content creators create their blog or social media content.",
      },
      {
        role: "user",
        content: "",
      },
    ],
  };
  result = {
    title: "",
    outline: "",
    content: "",
  };
  images: any = {
    model: "dall-e-3",
    prompt: "",
    n: 1,
    size: "1792x1024",
  };
  imageURL = "https://api.openai.com/v1/images/generations";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer YOUR_API_KEY_HERE",
      Accept: "application/json",
    }),
  };

  image = "";
  data: any;
  loadingContent = true;
  loadingImage = true;
  showError = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.postType = params["type"];
      this.idea = params["idea"];
      if (this.postType == "Blog")
        this.blogMessage =
          "I want to create a " +
          this.postType +
          "post about " +
          this.idea +
          '. Give a response in this JSON format {"title": "Blog Title", "outline": "Blog Outline", "content": “Blog Content"}. Content should be in paragraphs and should be big enough for a blog atleast 5000 words.';
      else if (this.postType == "MetaDescription")
        this.metaMessage =
          "I want to create a " +
          this.postType +
          "about " +
          this.idea +
          '. Give a response in this JSON format {"content": "Meta Description"}.';
      else
        this.socialMessage =
          "I want to create a " +
          this.postType +
          "post about " +
          this.idea +
          '. Give a response in this JSON format {"content": "Social Media Caption"}.';
      this.images.prompt =
        "Image for a " + this.postType + " about " + this.idea;
      this.messages.messages[0].content;
      if (this.postType != "MetaDescription") this.generateImage();
      this.generatePost();
      setTimeout(() => {
        this.showError = true;
      }, 5000);
    });
  }

  sendPostRequest(data: any): Observable<any> {
    return this.http.post<any>(this.url, data, this.httpOptions);
  }

  sendImagePostRequest(data: any): Observable<any> {
    return this.http.post<any>(this.imageURL, this.images, this.httpOptions);
  }

  generatePost() {
    if (this.postType == "Blog")
      this.messages.messages[1].content = this.blogMessage;
    else if (this.postType == "MetaDescription")
      this.messages.messages[1].content = this.metaMessage;
    else this.messages.messages[1].content = this.socialMessage;
    this.sendPostRequest(this.messages).subscribe((response) => {
      this.result = JSON.parse(response.choices[0].message.content);
      this.loadingContent = false;
    });
  }

  generateImage() {
    this.sendImagePostRequest(this.images).subscribe((response) => {
      this.image = response.data[0].url;
      this.loadingImage = false;
      this.closeError();
    });
  }

  copy(value: string) {
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    if (value == "title") selBox.value = this.result.title;
    if (value == "outline") selBox.value = this.result.outline;
    if (value == "content") selBox.value = this.result.content;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }

  closeError() {
    this.showError = false;
  }
}

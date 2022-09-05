import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'Test S3 upload';
  public downloadUrl: string = '';
  public file: any;

  public onFilechange(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  public async uploadImage(event: any) {
    const url = await this.getUploadUrl(this.file.name);
   
    let result = await fetch(url, {
      method: 'PUT',
      body: this.file,
    });
   
    const publicUrl = await this.getDownloadUrl(this.file.name);
    console.log("🚀 ~ file: app.component.ts ~ line 34 ~ AppComponent ~ uploadImage ~ publicUrl", publicUrl)
    this.downloadUrl = publicUrl;
  }

  private async getUploadUrl(filenameToUpload: string) {
    const response = await fetch(
      `http://localhost:3000/getUploadUrl?filenameToUpload=${filenameToUpload}`
    );
    const payload = await response.json();
    return payload.url;
  }

  private async getDownloadUrl(filenameToUpload:string): Promise<string>{
    const response = await fetch(
      `http://localhost:3000/getDownloadUrl?filenameToUpload=${filenameToUpload}`
    );
    const payload = await response.json();
    return payload.url;
  }
}

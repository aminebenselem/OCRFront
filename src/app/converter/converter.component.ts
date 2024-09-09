import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [NgxDocViewerModule,CommonModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css'
})
export class ConverterComponent implements OnInit {
filename:any
file!:File
fileUrl:any
text:any
url:any="http://localhost:5064/api/Files"
header:any=new HttpHeaders({"Content-Type":"application/multipart"})
quest:any
result:any
private http = inject(HttpClient);

ngOnInit(): void {

}
selectFile(event :any){
  this.file = event.target.files.item(0);
  this.filename= this.file.name
  console.log(this.filename)
}

upload(){
  this.quest=prompt("ajouter une question")
  console.log(this.quest);

  const formData: FormData = new FormData();
  formData.append('',this.file);
  this.http.post(this.url+"/upload",formData, {
    reportProgress: true
  }).subscribe({
    next: (res) => {console.log(res),this.text=res},
  error: (err) => console.log(err),
  complete: () => console.log("")});

if(this.quest!=null){
  let data=""
  this.http.post(this.url+"/generate?prompt="+this.quest,data).subscribe({
    next: (res) => {console.log(res),this.result=res},
  error: (err) => console.log(err),
  complete: () => console.log("")});
}
  
  
}


}


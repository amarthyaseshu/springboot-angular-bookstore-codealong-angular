import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/model/Book';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
})
export class AddbookComponent implements OnInit {
  @Input()
  book: Book;
  private selectedFile;
  imgURL: any;

  @Output()
  bookAddedEvent=new EventEmitter

  constructor(private httpClientService:HttpClientService, private activatedRoute:ActivatedRoute, private router:Router, private httpClient:HttpClient) {}

  ngOnInit(): void {}

  public onFileChanged(event){
    console.log(event);
    this.selectedFile=event.target.files[0];

    let reader=new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(event2)=>{
      this.imgURL=reader.result;
    }
  }

  saveBook(){
    const uploadData=new FormData();
    uploadData.append('imageFile',this.selectedFile,this.selectedFile.name);
    this.selectedFile.imageName=this.selectedFile.name;

    this.httpClient.post('http://localhost:8080/books/upload',uploadData,{observe:'response'})
    .subscribe((response)=>{
      if(response.status===200){
        this.httpClientService.addBook(this.book).subscribe((book)=>{
          this.bookAddedEvent.emit();
          this.router.navigate(['admin','books']);
        });
        console.log("image uploaded succesfully");
      }
      else{
        console.log("image upload failed");
      }
    });
  }
}

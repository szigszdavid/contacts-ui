import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/Contact';
import { GetByIdRequest } from "src/GetByIdRequest";
import { AuthService } from '../auth.service';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-get-contact-by-id',
  templateUrl: './get-contact-by-id.component.html',
  styleUrls: ['./get-contact-by-id.component.css']
})
export class GetContactByIdComponent implements OnInit {

  contact = new GetByIdRequest();

  constructor(private contactsService : ContactsService, private route : ActivatedRoute, private router: Router, public authService : AuthService) { }

  async ngOnInit(): Promise<void> {

    const id = +this.route.snapshot.paramMap.get("id")!;
    this.contact = await this.contactsService.getContactById(id);
  }

  public async handleDelete(): Promise<void> {
    console.log("DELETE");
    await this.contactsService.deleteIssue(this.contact.id);
    this.router.navigate(['/contacts']);
  }

}

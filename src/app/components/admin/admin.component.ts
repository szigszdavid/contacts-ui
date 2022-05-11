import { Component, OnInit } from '@angular/core';
import { ContactsService } from "../../services/contacts.service";
import { Contact } from "../../../Contact";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public contacts: Contact[] = [];

  constructor(private contactsService: ContactsService, private route: ActivatedRoute,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.contacts = await this.contactsService.getContacts();
    console.log(this.contacts);
    
  }

}

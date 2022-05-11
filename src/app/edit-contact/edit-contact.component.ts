import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/Contact';
import { CreateContactRequestBody } from 'src/CreateContactRequestBody';
import { GetByIdRequest } from 'src/GetByIdRequest';
import { ContactsService } from '../services/contacts.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contact = new GetByIdRequest();

  constructor(private contactService : ContactsService, private route: ActivatedRoute,private location : Location,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if(id)
    {
      this.contact = await this.contactService.getContactById(+id)
    }
  }

  async handleSave(contact: CreateContactRequestBody): Promise<void> {

    if(this.contact.id)
    {
      await this.contactService.updateContact(this.contact.id, contact);
      this.location.back();
    }
    await this.contactService.addContact(contact);
    this.router.navigate(['/contacts']);
  }

}

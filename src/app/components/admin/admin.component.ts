import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../../Contact';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public contacts: Contact[] = [];
  page = 0;

  @Input()
  inputData: string = '';
  
  companyInputData: string = "";

  async setValue(value: string) {
    this.inputData = value;
    await this.router.navigate(['/contacts/'], {
      queryParams: { page: this.page - 1, name: this.inputData },
    });
    this.contacts = await this.contactsService.getSearchResultForNames();
    console.log(this.contacts);
  }

  async searchCompany(companyId : string)
  {
    this.companyInputData = companyId;
    console.log("Id: ", this.companyInputData);
    
    await this.router.navigate(['/contacts/'], {
      queryParams: { page: this.page - 1, companyId: this.companyInputData },
    });
    this.contacts = await this.contactsService.getSearchResultForCompany();
  }

  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.contacts = await this.contactsService.getContacts();
  }

  getPageSymbol(current: number) {
    return ['1', '2', '3', '4'][current - 1];
  }

  async handlePageChange() {
    if (this.inputData === '' && this.companyInputData === "") {
      await this.router.navigate(['/contacts/'], {
        queryParams: { page: this.page - 1 },
      });
      this.contacts = await this.contactsService.getContacts();
    }
    else if (this.inputData === '' && this.companyInputData !== "") {
      console.log("dafsg", this.companyInputData);
      await this.router.navigate(['/contacts/'], {
        queryParams: { page: this.page - 1, companyId : this.companyInputData },
      });
      this.contacts = await this.contactsService.getSearchResultForCompany();
    }
    else if(this.inputData !== '' && this.companyInputData == "")
    {
      await this.router.navigate(['/contacts/'], {
        queryParams: { page: this.page - 1, name: this.inputData },
      });
      this.contacts = await this.contactsService.getSearchResultForNames();
    }
  }

  public async handleDelete(id: number): Promise<void> {
    console.log('DELETE');

    await this.contactsService.deleteIssue(id);
    this.handlePageChange();
  }
}

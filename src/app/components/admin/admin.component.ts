import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../../Contact';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { ContactsWithNumberOfAllContacts } from 'src/ContactsWithNumberOfAllContacts';
import { async } from 'rxjs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public contactsObject: ContactsWithNumberOfAllContacts;
  page = 0;
  fullNameSort = 'ASC'
  emailSort = "ASC"
  companySort = "ASC"
  pageSize = 10;

  @Input()
  inputData: string = '';
  
  companyInputData: string = "";

  async setValue(value: string) {
    this.inputData = value;
    await this.router.navigate(['/contacts/'], {
      queryParams: { page: this.page - 1, name: this.inputData},
    });
    this.contactsObject = await this.contactsService.getSearchResultForNames();
    
  }

  async searchCompany(companyId : string)
  {
    this.companyInputData = companyId;
    console.log("Id: ", this.companyInputData);
    
    await this.router.navigate(['/contacts/'], {
      queryParams: { page: this.page - 1, companyId: this.companyInputData },
    });
    this.contactsObject = await this.contactsService.getSearchResultForCompany();
  }

  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    
  ) {}

  async changeContactsByPage(size : number)
  {
    console.log("Change");
    
    await this.router.navigate(['/contacts/'], {
      queryParams: { page: this.page - 1, contactsByPage : size},
    });
    this.contactsObject = await this.contactsService.getContacts();
    this.pageSize = this.contactsObject.contactsPerPage;
  }

  async ngOnInit(): Promise<void> {
    this.contactsObject = await this.contactsService.getContacts();  
  }

  getPageSymbol(current: number) {
    return current;
  }

  async handlePageChange() {
    if (this.inputData === '' && this.companyInputData === "") {
      await this.router.navigate(['/contacts/'], {
        queryParams: { page: this.page - 1, orderway: this.fullNameSort == "ASC" ? null : this.fullNameSort},
      });
      this.contactsObject = await this.contactsService.getContacts();
    }
    else if (this.inputData === '' && this.companyInputData !== "") {
      console.log("dafsg", this.companyInputData);
      await this.router.navigate(['/contacts/'], {
        queryParams: { page: this.page - 1, companyId : this.companyInputData },
      });
      this.contactsObject = await this.contactsService.getSearchResultForCompany();
    }
    else if(this.inputData !== '' && this.companyInputData == "")
    {
      await this.router.navigate(['/contacts/'], {
        queryParams: { page: this.page - 1, name: this.inputData },
      });
      this.contactsObject = await this.contactsService.getSearchResultForNames();
    }
  }

  public async handleDelete(id: number): Promise<void> {
    console.log('DELETE');

    await this.contactsService.deleteIssue(id);
    this.handlePageChange();
  }

  async fullNameChangeSort()
  {
    
    if(this.fullNameSort === 'ASC')
    {
      this.fullNameSort = 'desc'
      await this.router.navigate(['/contacts/'], {
        queryParams: { page: this.page - 1, orderway: this.fullNameSort, name: this.inputData, companyId: this.companyInputData },
      });
      this.contactsObject = await this.contactsService.getContacts();
    }
    else
    {
      this.fullNameSort = 'ASC'
      await this.router.navigate(['/contacts/'], {
        queryParams: { page: this.page - 1},
      });
      this.contactsObject = await this.contactsService.getContacts();
    }
  }

  async emailChangeSort()
  {
    console.log("hello");
    
    if(this.emailSort === 'ASC')
    {
      this.emailSort = 'desc'
      await this.router.navigate(['/contacts/'], {
        queryParams: { page: this.page - 1, orderway: this.emailSort, orderby: "emailaddress" },
      });
      this.contactsObject = await this.contactsService.getContacts();
    }
    else
    {
      this.emailSort = 'ASC'
      await this.router.navigate(['/contacts/'], {
        queryParams: { page: this.page - 1, orderby: "emailaddress" },
      });
      this.contactsObject = await this.contactsService.getContacts();
    }
  }

  async companyChangeSort()
  {
    console.log("hello");
    
    if(this.companySort === 'ASC')
    {
      this.companySort = 'desc'
      await this.router.navigate(['/contacts/'], {
        queryParams: { page: this.page - 1, orderway: this.companySort, orderby: "company" },
      });
      this.contactsObject = await this.contactsService.getContacts();
    }
    else
    {
      this.companySort = 'ASC'
      await this.router.navigate(['/contacts/'], {
        queryParams: { page: this.page - 1, orderby: "company" },
      });
      this.contactsObject = await this.contactsService.getContacts();
    }
  }
}

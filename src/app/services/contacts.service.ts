import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { firstValueFrom, Observable } from "rxjs";
import { Contact } from "../../Contact";
import { GetByIdRequest } from "src/GetByIdRequest";
import { CreateContactRequestBody } from 'src/CreateContactRequestBody';
import { ActivatedRoute, Params } from '@angular/router';

const httpOptions = {
  headers : new HttpHeaders({'Content-Type' : "application/json" 
  
  })
}

@Injectable()
export class ContactsService {

  private contactUrl = 'http://localhost:8080/contacts';
  private params : Params

  constructor(private http:HttpClient, private route: ActivatedRoute) { 
    route.queryParams.subscribe((queryParam) => {
        this.params = queryParam
    })
  }


  public getContacts(): Promise<Contact[]> 
  {
    console.log(this.params);
    
    return firstValueFrom(this.http.get<Contact[]>(this.contactUrl,{params : this.params}));
  }

  public getContactById(id : number) : Promise<GetByIdRequest>
  {
    return firstValueFrom(this.http.get<GetByIdRequest>(`${this.contactUrl}/${id}`,httpOptions));
  }

  public addContact(newContact: CreateContactRequestBody): Promise<CreateContactRequestBody> {
    return firstValueFrom(this.http.post<CreateContactRequestBody>(this.contactUrl, newContact, httpOptions));
  }

  public updateContact(id: number, data: CreateContactRequestBody): Promise<CreateContactRequestBody> {
    return firstValueFrom(this.http.put<CreateContactRequestBody>(`${this.contactUrl}/${id}`, data,httpOptions));
  }

  public deleteIssue(id: number): Promise<Contact> {
    return firstValueFrom(this.http.delete<Contact>(`${this.contactUrl}/${id}`,httpOptions));
  }

  public getSearchResultForNames() : Promise<Contact[]>
  {
    return firstValueFrom(this.http.get<Contact[]>(this.contactUrl+"/search/name",{params : this.params}));
  }

  public getSearchResultForCompany() : Promise<Contact[]>
  {
    return firstValueFrom(this.http.get<Contact[]>(this.contactUrl+"/search/company",{params : this.params}));
  }
}

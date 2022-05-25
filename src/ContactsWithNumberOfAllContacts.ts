import { Contact } from "./Contact";

export class ContactsWithNumberOfAllContacts
{
    getAllContactsDTOList : Contact[] = [];
    numberOfPages: number = 0;
    numberOfAllContacts: number;
    currentPageNumber: number;
    contactsPerPage: number;
}
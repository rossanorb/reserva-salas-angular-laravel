import { Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { PaginateService } from '../services/paginate.service';


@Component({
  selector: 'paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnChanges {
  @Input() total: number;
  @Input() activePage: number;
  @Input() totalPage: number;
  @Input() pages: Array<number>;
  @Input() resource: string;
  @Output() onChangePage = new EventEmitter<boolean>();

  constructor(private httpService: PaginateService) { }
  /*
  when the page load the properties are undefined
  ao carregar a aplicação as propriedades estarão undefined
  quando receber valor então será disparado o evento que irá gerar a paginação
  */
  ngOnChanges(changes: any): void {

    if (changes.totalPage) {
      this.pages = Array(this.totalPage)
          .fill(this.totalPage)
          .map((x, i) => {
            return i + 1;
          });
    }
  }

  changePage(page: number) {
      this.activePage = page;
      this.httpService.resource(this.resource).list({page: page})
        .then((res) => {
          this.onChangePage.emit(res);
        });

  }

}

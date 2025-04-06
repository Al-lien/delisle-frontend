import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  Input,
  OnInit,
  signal,
  Signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import {
  BIKE_STATION_SNAPSHOT_DEFAULT as DEFAULT_SNAPSHOT,
  IPaginatedSnapshot,
} from '@ngx-wxc';

class RemovedPaginatorLabels extends MatPaginatorIntl {
  public override nextPageLabel: string = '';
  public override previousPageLabel: string = '';
}

@Component({
  selector: 'app-snapshot-paginator',
  templateUrl: './snapshot-paginator.component.html',
  styleUrls: ['./snapshot-paginator.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: new RemovedPaginatorLabels() },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnapshotPaginator<T> implements OnInit {
  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  @Input() public pageSize!: number;
  @Input() public hidePageSize!: boolean;
  @Input() public pageSizeOptions!: number[];
  @Input() public length!: number | undefined;
  @Input() public showFirstLastButtons!: boolean;
  @Input() public selectedItem$!: WritableSignal<T | undefined>;
  @Input() public displaySnapshots!: (
    item: T | undefined
  ) => IPaginatedSnapshot[] | undefined;

  public readonly pageIndex: WritableSignal<number> = signal<number>(0);

  public readonly displayedSnapshots: Signal<IPaginatedSnapshot[] | undefined> =
    computed(() => {
      const allSnapshots =
        this.displaySnapshots(this.selectedItem$())?.length !== 0
          ? this.displaySnapshots(this.selectedItem$())
          : DEFAULT_SNAPSHOT;
      const currentPageIndex = this.pageIndex();
      const startIndex = currentPageIndex * this.pageSize;
      return allSnapshots?.slice(startIndex, startIndex + this.pageSize);
    });

  constructor() {
    effect(() => {
      this.selectedItem$();
      this.paginator.firstPage();
    });
  }

  ngOnInit(): void {
    this.length = DEFAULT_SNAPSHOT.length;
    /* this.length = this.displaySnapshots(this.selectedItem$())?.length */
  }

  public handlePageEvent(e: PageEvent): void {
    this.pageIndex.set(e.pageIndex);
  }
}

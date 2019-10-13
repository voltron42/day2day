import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'dialog-wrapper',
  templateUrl: './dialog-wrapper.component.html',
  styleUrls: ['./dialog-wrapper.component.scss']
})
export class DialogWrapperComponent implements OnInit {

  @ViewChild('myDialog') dialogRef: ElementRef;

  @Input()
  triggerBtnName: string;

  @Input()
  triggerBtnClass: string = null;

  @Input()
  allowConfirm: boolean = true;

  @Input()
  dialogConfirm: any;

  @Input()
  dialogClose: any;

  @Input()
  dialogOpen: any;

  dialog: HTMLDialogElement;

  constructor() { }

  ngOnInit() {
    this.dialog = this.dialogRef.nativeElement as HTMLDialogElement;
  }

  open() {
    if (this.dialogOpen) {
      this.dialogOpen();
    }
    this.dialog.showModal();
  }

  confirm() {
    if (this.dialogConfirm) {
      this.dialogConfirm();
    }
    if (this.dialogClose) {
      this.dialogClose();
    }
    this.dialog.close();
  }

  cancel() {
    if (this.dialogClose) {
      this.dialogClose();
    }
    this.dialog.close();
  }

}

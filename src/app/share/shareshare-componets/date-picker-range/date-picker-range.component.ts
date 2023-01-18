import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-date-picker-range',
  templateUrl: './date-picker-range.component.html',
  styleUrls: ['./date-picker-range.component.css']
})
export class DatePickerRangeComponent implements OnInit {
  dateRange: any;

  @Output() newItemEvent = new EventEmitter<any>();
  maxDate = new Date();
  range = this.formBuilder.group({
    start: [new Date(new Date().setDate(this.maxDate.getDate() - 30))],
    end: [this.maxDate],
  });
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.newItemEvent.emit(this.wrapperDateRange(this.range.value));
    this.range.valueChanges.subscribe({
      next: value => {
        let dateRange = this.wrapperDateRange(value);
        if (dateRange.endDate) {
          this.newItemEvent.emit(dateRange);
        }
    }
    })
  }

  wrapperDateRange(range:any) {
    this.dateRange = range;

    let startDate = this.dateRange.start;
    let finishDate = this.dateRange.end;

    if (!finishDate ||(startDate.getTime() > finishDate.getTime())) {
      return {
        'beginDate': null,
        'endDate': null
      };
    }

    let beginDate = startDate ? startDate.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }) : '';
    let endDate = finishDate ? finishDate.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }) : '';
    return {
      'beginDate': beginDate,
      'endDate': endDate
    }
  }

}
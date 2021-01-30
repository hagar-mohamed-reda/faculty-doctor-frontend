import { Directive, ElementRef, Input } from '@angular/core';
import { Message } from '../message';

@Directive({
  selector: '[appSpinner]'
})
export class SpinnerDirective {

  $: any = $;
  input: any = null;
  increment: any = null;
  decrement: any = null;
  container: any = null;
  @Input() model: any = {};

  constructor(private el: ElementRef) {
    this.input = el.nativeElement;
    this.makeInputReady();
    this.createSpinner();
    this.incrementAction();
    this.decrementAction();

  }

  makeInputReady() {
    //this.el.nativeElement.readOnly = true;
    //this.$(this.el.nativeElement).css('display', 'none');
    var self = this;
    this.$(this.input).keyup(function(){
      if (parseFloat(self.model.student_grade) > parseFloat(self.getMax())) {
        self.model.student_grade = parseFloat(self.getMax());
      }
      if (parseFloat(self.model.student_grade) < parseFloat(self.getMin())) {
        self.model.student_grade = parseFloat(self.getMin());
      }
    });
  }

  getMax() {
    return this.input.getAttribute('max');
  }

  getMin() {
    return this.input.getAttribute('min');
  }

  createSpinner() {
    this.container = document.createElement('div');
    this.increment = document.createElement('span');
    this.decrement = document.createElement('span');
    this.increment.className = "fa fa-plus-square w3-large w3-text-indigo btn material-shadow w3-round";
    this.decrement.className = "fa fa-minus-square w3-large w3-text-indigo btn material-shadow w3-round";
    this.input.className="text-center w3-round material-shadow";
    this.$(this.input).css('width', '60px');
    this.$(this.increment).css('padding', '0px');
    this.$(this.decrement).css('padding', '0px');
    //this.$(this.container).css('width', "100px")
    this.input.parentElement.insertBefore(this.increment, this.input);
    this.input.parentElement.append(this.decrement);
    //this.$(this.input).parent()[0].insertBefore(this.decrement);
    //this.$(this.input).parent()[0].insertAfter(this.increment);
  }

  incrementAction() {
    console.log(this.model.student_grade);
    let self = this;
    this.$(this.increment).click(function(){
      let value = self.model.student_grade;

      if (!value) {
        value = 0;
      }

      if (value < parseFloat(self.getMax())) {
        self.model.student_grade = parseFloat(value) + 1;
      } else {
        //Message.error('max value');
      }
      console.log(value +":"+ self.getMax());
      console.log(value);

    });
  }

  decrementAction() {
    let self = this;
    this.$(this.decrement).click(function(){
      let value = self.model.student_grade;

      if (!value) {
        value = 0;
      }

      if (value > parseFloat(self.getMin())) {
        self.model.student_grade = parseFloat(value) - 1;
      } else {
        //Message.error('max value');
      }
      console.log(value +":"+ self.getMin());
      console.log(value);
    });
  }



}

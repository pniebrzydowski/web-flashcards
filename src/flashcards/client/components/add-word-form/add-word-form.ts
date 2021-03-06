import 'reflect-metadata';
import {Component} from 'angular2/core';
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {FormBuilder, ControlGroup, Validators, Control} from 'angular2/common';
import {Words} from '../../../collections/words';
import {RouteParams} from 'angular2/router';
 
@Component({
  selector: 'add-word-form',
  templateUrl: '/client/components/add-word-form/add-word-form.html'
})

export class AddWordForm {
	showWindow: boolean = false;
	addWordForm: ControlGroup;
 
	constructor(params: RouteParams) {
		let fb = new FormBuilder();
		
		this.addWordForm = fb.group({
	    	front: ['',Validators.required],
	    	back: ['',Validators.required],
	    	deckId: params.get('deckId')
		});
	}
  
	addNewCard() {
		this.openWindow();
	}
  
  
	addWord(word) {
		if (this.addWordForm.valid) {
			Words.insert({
				front: word.front,
				back: word.back,
				score: 0,
				creator: Meteor.userId(),
				deckid: word.deckId
			});
 
			(<Control>this.addWordForm.controls['front']).updateValue('');
			(<Control>this.addWordForm.controls['back']).updateValue('');
      
			this.closeWindow();
		}
	}
  
	openWindow() {
		this.showWindow = true;
	}
  
	closeWindow() {
		this.showWindow = false;
	}
}
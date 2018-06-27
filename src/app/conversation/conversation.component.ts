import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  id: any;
  constructor(public activatedRoute: ActivatedRoute) {
    this.id = activatedRoute.snapshot.params['user_id'];
    console.log(this.id);
  }

  ngOnInit() {
  }

}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {LoggingService} from '../../utility/logging.service';
import {TreeNode} from 'primeng/primeng';
import {Story} from '../../engine/entities/story';

@Component({
  selector: 'if-editor-host',
  templateUrl: './editor-host.component.html',
  styleUrls: ['./editor-host.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditorHostComponent implements OnInit {

  storyData: TreeNode[] = [];
  loading: boolean = true;
  story: Story;

  constructor(private ifService: InteractiveFictionService) {

  }

  ngOnInit() {
    LoggingService.instance.debug(this.ifService.story);
  }

}

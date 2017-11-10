import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {LoggingService} from '../../utility/logging.service';
import {ActivatedRoute, Params, UrlSegment} from '@angular/router';
import {TextOutputService} from '../../engine/text-output.service';
import {StoryService} from '../../services/story.service';
import {Subscription} from 'rxjs/Subscription';
import {StoryData} from '../../engine/story-data/story-data';
import {EditorSidebarComponent} from '../editor-sidebar/editor-sidebar.component';

@Component({
  selector: 'if-editor-host',
  templateUrl: './editor-host.component.html',
  styleUrls: ['./editor-host.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditorHostComponent implements OnInit, OnDestroy {

  public story: StoryData;
  public loading: boolean = true;
  public isImporting: boolean = false;
  public selectedNode: any;
  private routerSubscription: Subscription;
  private routerParamSubscription: Subscription;
  private fileSaver: any;

  @ViewChild('sidebar') private sidebar: EditorSidebarComponent;

  constructor(private outputService: TextOutputService,
              private logger: LoggingService,
              private route: ActivatedRoute,
              private ifService: InteractiveFictionService,
              private storyService: StoryService) {

  }

  ngOnInit(): void {
    this.routerSubscription = this.route.url.subscribe(u => this.onUrlEvent(u));
    this.routerParamSubscription = this.route.params.subscribe(p => this.loadFromParameters(p));
  }

  ngOnDestroy(): void {

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.routerParamSubscription) {
      this.routerParamSubscription.unsubscribe();
    }

  }

  onNodeSelected(node: any): void {
    this.logger.debug(`Node Selected`);
    this.logger.debug(node);
    this.selectedNode = node;
  }

  onSaveClick(): void {
    LoggingService.instance.log('Generating JSON data for story');

    if (!this.fileSaver) {
      this.fileSaver = require('file-saver');
    }

    const data: string = JSON.stringify(this.story);
    const blob: Blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
    this.fileSaver.saveAs(blob, `${this.story.name}.json`);

  }

  onLoadClick(): void {
    LoggingService.instance.log('Requested to import JSON');

    this.isImporting = true;

  }

  onImported(data: StoryData): void {
    this.story = data;
    this.isImporting = false;
  }

  onImportCancelled(): void {
    this.isImporting = false;
  }

  private loadFromParameters(p: Params | undefined) {

    LoggingService.instance.debug(`Loaded route parameters`);

    if (!p) {
      // TODO: Redirect to a not found route
      LoggingService.instance.warning(`No route parameters detected`);
      LoggingService.instance.debug(p);
      return;
    }

    const storyKey: string = p['key'];

    if (storyKey === undefined) {
      LoggingService.instance.debug(`Starting from blank story`);
      this.story = this.storyService.buildEmptyStoryData();
    } else {
      LoggingService.instance.debug(`Loading story with key ${storyKey}`);
      this.story = this.storyService.getStoryData(storyKey);
    }

    if (!this.story) {
      // TODO: Redirect to a not found route
      LoggingService.instance.warning(`Story ${storyKey} could not be found.`);
      return;
    }

    LoggingService.instance.debug(`Loaded story ${this.story.name}`);

    this.loading = false;
    if (this.sidebar) {
      this.selectedNode = this.sidebar.selectedNode;
    }
  }

  private onUrlEvent(u: UrlSegment[] | undefined) {
    if (u && u.filter(s => s.path === 'Import').length > 0) {
      this.isImporting = true;
    }
  }
}

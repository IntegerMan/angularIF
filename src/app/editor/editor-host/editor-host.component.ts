import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {LoggingService} from '../../utility/logging.service';
import {ActivatedRoute, Params, UrlSegment} from '@angular/router';
import {TextOutputService} from '../../engine/text-output.service';
import {StoryService} from '../../services/story.service';
import {Subscription} from 'rxjs/Subscription';
import {StoryData} from '../../engine/story-data/story-data';
import {EditorService} from '../editor.service';

@Component({
  selector: 'if-editor-host',
  templateUrl: './editor-host.component.html',
  styleUrls: ['./editor-host.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditorHostComponent implements OnInit, OnDestroy {

  public loading: boolean = true;
  public isImporting: boolean = false;
  public selectedNode: any;
  public story: StoryData;

  private routerSubscription: Subscription;
  private routerParamSubscription: Subscription;
  private nodeSubscription: Subscription;

  constructor(private outputService: TextOutputService,
              private logger: LoggingService,
              private route: ActivatedRoute,
              private ifService: InteractiveFictionService,
              private editorService: EditorService,
              private storyService: StoryService) {

  }

  ngOnInit(): void {
    this.routerSubscription = this.route.url.subscribe(u => this.onUrlEvent(u));
    this.routerParamSubscription = this.route.params.subscribe(p => this.loadFromParameters(p));
    this.nodeSubscription = this.editorService.nodeSelected.subscribe(n => this.onNodeSelected(n));
  }

  ngOnDestroy(): void {

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.routerParamSubscription) {
      this.routerParamSubscription.unsubscribe();
    }
    if (this.nodeSubscription) {
      this.nodeSubscription.unsubscribe();
    }

  }

  onNodeSelected(node: any): void {
    this.selectedNode = node;
  }

  onSaveClick(): void {
    this.editorService.saveToJSON();
  }

  onLoadClick(): void {
    LoggingService.instance.log('Requested to import JSON');

    this.isImporting = true;
  }

  onImported(data: StoryData): void {
    this.editorService.storyData = data;
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
    let story: StoryData = null;

    if (storyKey === undefined) {
      LoggingService.instance.debug(`Starting from blank story`);
      story = this.storyService.buildEmptyStoryData();
    } else {
      LoggingService.instance.debug(`Loading story with key ${storyKey}`);
      story = this.storyService.getStoryData(storyKey);
    }

    // Ensure the service knows what we're talking about
    this.editorService.storyData = story;
    this.story = story;

    if (!story) {
      // TODO: Redirect to a not found route
      LoggingService.instance.warning(`Story ${storyKey} could not be found.`);
      return;
    }

    LoggingService.instance.debug(`Loaded story ${story.name}`);

    this.loading = false;
    this.selectedNode = this.editorService.selectedNode;
  }

  private onUrlEvent(u: UrlSegment[] | undefined) {
    if (u && u.filter(s => s.path === 'Import').length > 0) {
      this.isImporting = true;
    }
  }
}
